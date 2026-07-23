import type { ProjectSummaryDto, ProjectTechnologyDto } from "@portfolio/types";

import { REVALIDATE } from "./constants";
import { FALLBACK_PROJECTS } from "./fallback-data";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "thalitapaiva";

/** Repos that should not appear as portfolio project cards. */
const EXCLUDED_REPO_NAMES = new Set(
  ["portfolio-thalita", GITHUB_USERNAME.toLowerCase()].map((n) => n.toLowerCase()),
);

type RawRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  topics?: string[];
};

function fromGitHubRepo(repo: RawRepo, displayOrder: number): ProjectSummaryDto {
  const year = new Date(repo.updated_at).getFullYear();
  const techs: ProjectTechnologyDto[] = [];

  if (repo.language) {
    techs.push({
      isPrimary: true,
      technology: {
        id: `lang-${repo.language.toLowerCase()}`,
        name: repo.language,
        slug: repo.language.toLowerCase(),
        icon: repo.language.toLowerCase(),
      },
    });
  }

  for (const topic of (repo.topics ?? []).slice(0, 4)) {
    techs.push({
      isPrimary: false,
      technology: {
        id: `topic-${topic}`,
        name: topic,
        slug: topic,
        icon: null,
      },
    });
  }

  return {
    id: `github-${repo.id}`,
    title: repo.name,
    slug: `gh-${repo.name}`,
    shortDescription:
      repo.description?.trim() ||
      `Public repository ${repo.full_name} synced automatically from GitHub.`,
    year,
    coverUrl: null,
    repositoryUrl: repo.html_url,
    liveUrl: null,
    featured: false,
    displayOrder,
    technologies: techs,
  };
}

async function fetchPublicRepos(): Promise<RawRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": `portfolio-thalita/${GITHUB_USERNAME}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
    {
      headers,
      next: { revalidate: REVALIDATE.projects, tags: ["projects", "github-projects"] },
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub repos fetch failed: ${res.status}`);
  }

  return (await res.json()) as RawRepo[];
}

/**
 * Curated fallback projects + every public GitHub repo (non-fork, non-archived),
 * so new pushes show up on the Vercel site without the Nest API.
 */
export async function getProjectsWithGitHub(): Promise<ProjectSummaryDto[]> {
  const curated = FALLBACK_PROJECTS;
  const curatedUrls = new Set(
    curated
      .map((p) => p.repositoryUrl?.toLowerCase())
      .filter((u): u is string => Boolean(u)),
  );
  const curatedSlugs = new Set(curated.map((p) => p.slug));
  const curatedNames = new Set(
    curated
      .map((p) => p.repositoryUrl?.split("/").pop()?.toLowerCase())
      .filter((n): n is string => Boolean(n)),
  );

  try {
    const repos = await fetchPublicRepos();
    const githubProjects = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .filter((repo) => !EXCLUDED_REPO_NAMES.has(repo.name.toLowerCase()))
      .filter((repo) => !curatedUrls.has(repo.html_url.toLowerCase()))
      .filter((repo) => !curatedNames.has(repo.name.toLowerCase()))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
      .map((repo, index) => fromGitHubRepo(repo, curated.length + index + 1))
      .filter((p) => !curatedSlugs.has(p.slug));

    return [...curated, ...githubProjects];
  } catch {
    return curated;
  }
}
