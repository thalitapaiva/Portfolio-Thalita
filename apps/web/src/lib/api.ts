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

async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  options: FetchOptions = {},
): Promise<T> {
  const url = `${env.apiUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const next: { revalidate?: number | false; tags?: string[] } = {};
  if (options.revalidate !== undefined) next.revalidate = options.revalidate;
  if (options.tags) next.tags = options.tags;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
    signal: options.signal,
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
      null,
    ),

  getSkills: (): Promise<SkillDto[]> =>
    safe(
      () =>
        apiFetch<SkillDto[]>("/skills", {}, {
          revalidate: REVALIDATE.skills,
          tags: ["skills"],
        }),
      [],
    ),

  getProjects: (): Promise<ProjectSummaryDto[]> =>
    safe(
      () =>
        apiFetch<ProjectSummaryDto[]>("/projects", {}, {
          revalidate: REVALIDATE.projects,
          tags: ["projects"],
        }),
      [],
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
      [],
    ),

  sendContact: (payload: ContactRequestDto): Promise<ContactResponseDto> =>
    apiFetch<ContactResponseDto>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export type { ContactRequestDto, ContactResponseDto };
