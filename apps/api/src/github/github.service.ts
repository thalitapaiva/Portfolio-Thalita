import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";
import type {
  GitHubLanguageStat,
  GitHubProfileDto,
  GitHubRepoDto,
} from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";
import type { RawGitHubRepo, RawGitHubUser } from "./github.types";

const PROFILE_CACHE_KEY = "github:profile";
const REPOS_CACHE_KEY = "github:repositories";
const USER_ENDPOINT = "https://api.github.com/users";
const DEFAULT_MAX_REPOS = 6;
const DEFAULT_TIMEOUT_MS = 8_000;
const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 400;

interface FetchOptions {
  timeoutMs?: number;
  maxRetries?: number;
}

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  async getProfile(): Promise<GitHubProfileDto> {
    const cached = await this.cache.get<GitHubProfileDto>(PROFILE_CACHE_KEY);
    if (cached) {
      return { ...cached, fromCache: true, fromFallback: false };
    }

    try {
      const { user, repos } = await this.fetchProfileAndRepos();
      const selected = await this.selectRepositories(repos);
      const dto = this.buildProfileDto(user, repos, selected, {
        fromCache: false,
        fromFallback: false,
      });

      await this.persistCache(PROFILE_CACHE_KEY, dto);
      await this.cache.set(PROFILE_CACHE_KEY, dto, this.cacheTtlMs());
      return dto;
    } catch (err) {
      this.logger.warn(
        `GitHub profile fetch failed, attempting fallback: ${(err as Error).message}`,
      );
      const fallback = await this.readCache<GitHubProfileDto>(PROFILE_CACHE_KEY);
      if (fallback) {
        return { ...fallback, fromCache: false, fromFallback: true };
      }
      return this.emptyProfileDto();
    }
  }

  async getRepositories(): Promise<GitHubRepoDto[]> {
    const cached = await this.cache.get<GitHubRepoDto[]>(REPOS_CACHE_KEY);
    if (cached) return cached;

    try {
      const { repos } = await this.fetchProfileAndRepos();
      const selected = await this.selectRepositories(repos);
      const dtos = selected.map((r) => this.normalizeRepo(r));
      await this.persistCache(REPOS_CACHE_KEY, dtos);
      await this.cache.set(REPOS_CACHE_KEY, dtos, this.cacheTtlMs());
      return dtos;
    } catch (err) {
      this.logger.warn(
        `GitHub repositories fetch failed, attempting fallback: ${(err as Error).message}`,
      );
      const fallback = await this.readCache<GitHubRepoDto[]>(REPOS_CACHE_KEY);
      if (fallback) return fallback;
      return [];
    }
  }

  /** All public non-fork/non-archived repos — used to auto-populate project cards. */
  async getAllPublicRepositories(): Promise<GitHubRepoDto[]> {
    const cacheKey = "github:repositories:all";
    const cached = await this.cache.get<GitHubRepoDto[]>(cacheKey);
    if (cached) return cached;

    try {
      const { repos } = await this.fetchProfileAndRepos();
      const dtos = repos
        .filter((r) => !r.fork && !r.archived)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
        .map((r) => this.normalizeRepo(r));
      await this.cache.set(cacheKey, dtos, this.cacheTtlMs());
      return dtos;
    } catch (err) {
      this.logger.warn(
        `GitHub all-repos fetch failed: ${(err as Error).message}`,
      );
      return [];
    }
  }

  // -------------------------------------------------------------------------
  // Normalisation (public for tests)
  // -------------------------------------------------------------------------

  buildProfileDto(
    user: RawGitHubUser,
    allRepos: RawGitHubRepo[],
    selectedRepos: RawGitHubRepo[],
    meta: { fromCache: boolean; fromFallback: boolean },
  ): GitHubProfileDto {
    const totalStars = allRepos.reduce(
      (sum, r) => sum + (r.stargazers_count ?? 0),
      0,
    );
    return {
      login: user.login,
      name: user.name,
      bio: user.bio,
      htmlUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages: this.computeLanguageStats(allRepos),
      repositories: selectedRepos.map((r) => this.normalizeRepo(r)),
      fetchedAt: new Date().toISOString(),
      fromCache: meta.fromCache,
      fromFallback: meta.fromFallback,
    };
  }

  normalizeRepo(repo: RawGitHubRepo): GitHubRepoDto {
    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      language: repo.language,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      updatedAt: repo.updated_at,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      archived: Boolean(repo.archived),
      fork: Boolean(repo.fork),
    };
  }

  computeLanguageStats(repos: RawGitHubRepo[]): GitHubLanguageStat[] {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const total = Array.from(counts.values()).reduce((s, n) => s + n, 0);
    if (total === 0) return [];
    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 1000) / 10,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }

  // -------------------------------------------------------------------------
  // Selection logic (public for tests)
  // -------------------------------------------------------------------------

  async selectRepositories(repos: RawGitHubRepo[]): Promise<RawGitHubRepo[]> {
    const manual = await this.prisma.gitHubRepositorySelection.findMany({
      where: { enabled: true },
      orderBy: { displayOrder: "asc" },
    });

    if (manual.length > 0) {
      const byName = new Map(repos.map((r) => [r.full_name.toLowerCase(), r]));
      const picked: RawGitHubRepo[] = [];
      for (const sel of manual) {
        const match = byName.get(sel.repoFullName.toLowerCase());
        if (match) picked.push(match);
      }
      if (picked.length > 0) return picked;
      // Fall through to auto-selection if none of the manual entries matched.
    }

    return this.autoSelectRepositories(repos);
  }

  autoSelectRepositories(repos: RawGitHubRepo[]): RawGitHubRepo[] {
    const filtered = repos.filter((r) => !r.fork && !r.archived);
    const withDescription = filtered.filter(
      (r) => r.description && r.description.trim().length > 0,
    );
    const withoutDescription = filtered.filter(
      (r) => !r.description || r.description.trim().length === 0,
    );

    const sortByStarsThenDate = (a: RawGitHubRepo, b: RawGitHubRepo) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    };

    const ordered = [
      ...withDescription.sort(sortByStarsThenDate),
      ...withoutDescription.sort(sortByStarsThenDate),
    ];
    return ordered.slice(0, DEFAULT_MAX_REPOS);
  }

  // -------------------------------------------------------------------------
  // Fetch primitives (public for tests / mocking)
  // -------------------------------------------------------------------------

  async fetchProfileAndRepos(): Promise<{
    user: RawGitHubUser;
    repos: RawGitHubRepo[];
  }> {
    const username = this.githubUsername();
    const [user, repos] = await Promise.all([
      this.fetchJson<RawGitHubUser>(`${USER_ENDPOINT}/${username}`),
      this.fetchJson<RawGitHubRepo[]>(
        `${USER_ENDPOINT}/${username}/repos?per_page=100&sort=updated`,
      ),
    ]);
    return { user, repos: Array.isArray(repos) ? repos : [] };
  }

  async fetchJson<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const { timeoutMs = DEFAULT_TIMEOUT_MS, maxRetries = MAX_RETRIES } = options;
    let attempt = 0;
    let lastError: unknown;

    while (attempt <= maxRetries) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: this.buildHeaders(),
          signal: controller.signal,
        });

        if (response.status === 403 || response.status === 429) {
          const remaining = response.headers.get("x-ratelimit-remaining");
          const reset = response.headers.get("x-ratelimit-reset");
          this.logger.warn(
            `GitHub rate-limited (status=${response.status}, remaining=${remaining}, reset=${reset})`,
          );
          throw new Error(
            `GitHub API rate limited: status=${response.status}`,
          );
        }

        if (!response.ok) {
          const body = await response.text();
          throw new Error(
            `GitHub API error ${response.status} for ${url}: ${body.slice(0, 200)}`,
          );
        }

        return (await response.json()) as T;
      } catch (err) {
        lastError = err;
        attempt += 1;
        if (attempt > maxRetries) break;
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
        this.logger.debug(
          `GitHub fetch attempt ${attempt} failed for ${url}, retrying in ${delay}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } finally {
        clearTimeout(timeout);
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error(`GitHub fetch failed for ${url}`);
  }

  // -------------------------------------------------------------------------
  // Cache helpers (persistent + in-memory)
  // -------------------------------------------------------------------------

  private async persistCache(key: string, payload: unknown): Promise<void> {
    try {
      await this.prisma.gitHubCache.upsert({
        where: { key },
        update: { payload: payload as never, fetchedAt: new Date() },
        create: { key, payload: payload as never },
      });
    } catch (err) {
      this.logger.warn(
        `Failed to persist GitHub cache for key=${key}: ${(err as Error).message}`,
      );
    }
  }

  private async readCache<T>(key: string): Promise<T | null> {
    try {
      const row = await this.prisma.gitHubCache.findUnique({ where: { key } });
      return (row?.payload as T) ?? null;
    } catch {
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // Internals
  // -------------------------------------------------------------------------

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": `portfolio-thalita/${this.githubUsername()}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const token = this.config.get<string>("GITHUB_TOKEN");
    if (token && token.trim().length > 0) {
      headers.Authorization = `Bearer ${token.trim()}`;
    }
    return headers;
  }

  private githubUsername(): string {
    return this.config.get<string>("GITHUB_USERNAME") ?? "thalitapaiva";
  }

  private cacheTtlMs(): number {
    const seconds =
      Number(this.config.get<string>("GITHUB_CACHE_TTL_SECONDS")) || 2700;
    return seconds * 1000;
  }

  private emptyProfileDto(): GitHubProfileDto {
    return {
      login: this.githubUsername(),
      name: null,
      bio: null,
      htmlUrl: `https://github.com/${this.githubUsername()}`,
      publicRepos: 0,
      followers: 0,
      following: 0,
      totalStars: 0,
      topLanguages: [],
      repositories: [],
      fetchedAt: new Date().toISOString(),
      fromCache: false,
      fromFallback: true,
    };
  }
}
