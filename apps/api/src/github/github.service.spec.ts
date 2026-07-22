import { Test, type TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { GitHubService } from "./github.service";
import { PrismaService } from "../prisma/prisma.service";
import type { RawGitHubRepo, RawGitHubUser } from "./github.types";

const makeRepo = (overrides: Partial<RawGitHubRepo> = {}): RawGitHubRepo => ({
  id: 1,
  name: "sample",
  full_name: "thalitapaiva/sample",
  description: "Sample repo",
  html_url: "https://github.com/thalitapaiva/sample",
  language: "JavaScript",
  stargazers_count: 0,
  forks_count: 0,
  updated_at: "2024-01-01T00:00:00Z",
  topics: [],
  archived: false,
  fork: false,
  ...overrides,
});

const makeUser = (): RawGitHubUser => ({
  login: "thalitapaiva",
  name: "Thalita Paiva",
  bio: "Information Systems Student",
  html_url: "https://github.com/thalitapaiva",
  public_repos: 10,
  followers: 5,
  following: 5,
});

describe("GitHubService", () => {
  let service: GitHubService;
  let prisma: { gitHubRepositorySelection: { findMany: jest.Mock } };
  let cache: { get: jest.Mock; set: jest.Mock };
  let config: ConfigService;

  beforeEach(async () => {
    prisma = {
      gitHubRepositorySelection: { findMany: jest.fn().mockResolvedValue([]) },
    };
    cache = { get: jest.fn(), set: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitHubService,
        {
          provide: ConfigService,
          useValue: {
            get: (k: string) =>
              ({
                GITHUB_USERNAME: "thalitapaiva",
                GITHUB_CACHE_TTL_SECONDS: "2700",
              } as Record<string, string>)[k],
          },
        },
        { provide: PrismaService, useValue: prisma },
        { provide: CACHE_MANAGER, useValue: cache },
      ],
    }).compile();

    service = module.get(GitHubService);
    config = module.get(ConfigService);
    void config;
  });

  describe("normalizeRepo", () => {
    it("maps snake_case GitHub fields to camelCase DTO", () => {
      const dto = service.normalizeRepo(
        makeRepo({
          id: 42,
          name: "weather",
          full_name: "thalitapaiva/weather",
          language: "JavaScript",
          stargazers_count: 3,
          forks_count: 1,
          archived: false,
          fork: false,
          topics: ["weather", "api"],
        }),
      );
      expect(dto).toEqual({
        id: 42,
        name: "weather",
        fullName: "thalitapaiva/weather",
        description: "Sample repo",
        htmlUrl: "https://github.com/thalitapaiva/sample",
        language: "JavaScript",
        stargazersCount: 3,
        forksCount: 1,
        updatedAt: "2024-01-01T00:00:00Z",
        topics: ["weather", "api"],
        archived: false,
        fork: false,
      });
    });

    it("defaults topics to an empty array when missing", () => {
      const repo = makeRepo();
      delete (repo as { topics?: string[] }).topics;
      expect(service.normalizeRepo(repo).topics).toEqual([]);
    });
  });

  describe("computeLanguageStats", () => {
    it("aggregates + sorts languages by count with percentages", () => {
      const stats = service.computeLanguageStats([
        makeRepo({ language: "JavaScript" }),
        makeRepo({ language: "JavaScript" }),
        makeRepo({ language: "TypeScript" }),
        makeRepo({ language: null }),
      ]);
      expect(stats).toHaveLength(2);
      expect(stats[0]).toMatchObject({ name: "JavaScript", count: 2 });
      expect(stats[1]).toMatchObject({ name: "TypeScript", count: 1 });
      const total = stats.reduce((sum, s) => sum + s.percentage, 0);
      expect(Math.round(total)).toBe(100);
    });

    it("returns an empty array when no repos have languages", () => {
      expect(
        service.computeLanguageStats([makeRepo({ language: null })]),
      ).toEqual([]);
    });
  });

  describe("autoSelectRepositories", () => {
    it("excludes forks and archived repos", () => {
      const repos = [
        makeRepo({ id: 1, fork: true }),
        makeRepo({ id: 2, archived: true }),
        makeRepo({ id: 3 }),
      ];
      const selected = service.autoSelectRepositories(repos);
      expect(selected.map((r) => r.id)).toEqual([3]);
    });

    it("prefers repos with descriptions over those without", () => {
      const repos = [
        makeRepo({ id: 1, description: null, stargazers_count: 10 }),
        makeRepo({ id: 2, description: "Great project", stargazers_count: 0 }),
      ];
      const selected = service.autoSelectRepositories(repos);
      expect(selected[0]?.id).toBe(2);
      expect(selected[1]?.id).toBe(1);
    });

    it("caps output at 6 repositories", () => {
      const repos = Array.from({ length: 20 }, (_, i) =>
        makeRepo({ id: i, full_name: `thalitapaiva/repo-${i}` }),
      );
      expect(service.autoSelectRepositories(repos)).toHaveLength(6);
    });
  });

  describe("selectRepositories", () => {
    it("respects manual selections when enabled rows exist", async () => {
      prisma.gitHubRepositorySelection.findMany.mockResolvedValueOnce([
        { repoFullName: "thalitapaiva/weather", displayOrder: 1, enabled: true },
        { repoFullName: "thalitapaiva/clocks", displayOrder: 2, enabled: true },
      ]);
      const repos = [
        makeRepo({ id: 10, full_name: "thalitapaiva/clocks" }),
        makeRepo({ id: 11, full_name: "thalitapaiva/weather" }),
        makeRepo({ id: 12, full_name: "thalitapaiva/other" }),
      ];
      const result = await service.selectRepositories(repos);
      expect(result.map((r) => r.full_name)).toEqual([
        "thalitapaiva/weather",
        "thalitapaiva/clocks",
      ]);
    });

    it("falls back to auto-selection when no manual selection matches", async () => {
      prisma.gitHubRepositorySelection.findMany.mockResolvedValueOnce([
        { repoFullName: "thalitapaiva/does-not-exist", displayOrder: 1, enabled: true },
      ]);
      const repos = [makeRepo({ id: 99, full_name: "thalitapaiva/keeper" })];
      const result = await service.selectRepositories(repos);
      expect(result.map((r) => r.id)).toEqual([99]);
    });
  });

  describe("buildProfileDto", () => {
    it("computes totalStars and marks fromCache/fromFallback correctly", () => {
      const dto = service.buildProfileDto(
        makeUser(),
        [
          makeRepo({ id: 1, stargazers_count: 4 }),
          makeRepo({ id: 2, stargazers_count: 1 }),
        ],
        [makeRepo({ id: 1 })],
        { fromCache: false, fromFallback: false },
      );
      expect(dto.totalStars).toBe(5);
      expect(dto.repositories).toHaveLength(1);
      expect(dto.fromCache).toBe(false);
      expect(dto.fromFallback).toBe(false);
      expect(dto.login).toBe("thalitapaiva");
    });
  });
});
