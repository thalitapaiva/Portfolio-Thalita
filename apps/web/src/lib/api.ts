import type {
  ContactRequestDto,
  ContactResponseDto,
  GitHubProfileDto,
  PortfolioProfileDto,
  ProjectDetailDto,
  ProjectSummaryDto,
  SkillDto,
  SocialLinkDto,
} from "@portfolio/types";

import { env } from "./env";
import { REVALIDATE } from "./constants";
import {
  FALLBACK_PROFILE,
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  FALLBACK_SOCIAL,
} from "./fallback-data";

type FetchOptions = {
  revalidate?: number | false;
  tags?: string[];
  signal?: AbortSignal;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

function isLocalApiUrl(url: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(url);
}

/** Avoid hanging the Vercel/CI/SSG build when the Nest API is not reachable. */
function shouldSkipRemoteApi(): boolean {
  if (!isLocalApiUrl(env.apiUrl)) return false;
  return Boolean(
    process.env.VERCEL ||
      process.env.CI ||
      process.env.NEXT_PHASE === "phase-production-build" ||
      process.env.NODE_ENV === "production",
  );
}

async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  options: FetchOptions = {},
): Promise<T> {
  if (shouldSkipRemoteApi()) {
    throw new ApiError("API unavailable during build", 503);
  }

  const url = `${env.apiUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const next: { revalidate?: number | false; tags?: string[] } = {};
  if (options.revalidate !== undefined) next.revalidate = options.revalidate;
  if (options.tags) next.tags = options.tags;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  const signal = options.signal ?? controller.signal;

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...(init.headers ?? {}),
      },
      signal,
      ...(Object.keys(next).length ? { next } : {}),
    });

    if (!res.ok) {
      let message = res.statusText || "Request failed";
      try {
        const data = (await res.json()) as { message?: string | string[] };
        if (data?.message) {
          message = Array.isArray(data.message) ? data.message.join(", ") : data.message;
        }
      } catch {
        // ignore
      }
      throw new ApiError(message, res.status);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[api] fetch failed:", (err as Error).message);
    }
    return fallback;
  }
}

export const api = {
  getProfile: (): Promise<PortfolioProfileDto | null> =>
    safe(
      () =>
        apiFetch<PortfolioProfileDto>("/portfolio", {}, {
          revalidate: REVALIDATE.profile,
          tags: ["profile"],
        }),
      FALLBACK_PROFILE,
    ),

  getSkills: (): Promise<SkillDto[]> =>
    safe(
      () =>
        apiFetch<SkillDto[]>("/skills", {}, {
          revalidate: REVALIDATE.skills,
          tags: ["skills"],
        }),
      FALLBACK_SKILLS,
    ),

  getProjects: (): Promise<ProjectSummaryDto[]> =>
    safe(
      () =>
        apiFetch<ProjectSummaryDto[]>("/projects", {}, {
          revalidate: REVALIDATE.projects,
          tags: ["projects"],
        }),
      FALLBACK_PROJECTS,
    ),

  getProject: (slug: string): Promise<ProjectDetailDto | null> =>
    safe(
      () =>
        apiFetch<ProjectDetailDto>(`/projects/${encodeURIComponent(slug)}`, {}, {
          revalidate: REVALIDATE.projects,
          tags: ["projects", `project:${slug}`],
        }),
      null,
    ),

  getGithub: (): Promise<GitHubProfileDto | null> =>
    safe(
      () =>
        apiFetch<GitHubProfileDto>("/integrations/github/profile", {}, {
          revalidate: REVALIDATE.github,
          tags: ["github"],
        }),
      null,
    ),

  getSocialLinks: (): Promise<SocialLinkDto[]> =>
    safe(
      () =>
        apiFetch<SocialLinkDto[]>("/social-links", {}, {
          revalidate: REVALIDATE.social,
          tags: ["social"],
        }),
      FALLBACK_SOCIAL,
    ),

  sendContact: (payload: ContactRequestDto): Promise<ContactResponseDto> =>
    apiFetch<ContactResponseDto>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export type { ContactRequestDto, ContactResponseDto };
