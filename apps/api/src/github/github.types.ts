/**
 * Raw shapes returned by the public GitHub REST API. Only the fields we
 * actually consume are declared — anything else is intentionally ignored.
 */

export interface RawGitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface RawGitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  archived: boolean;
  fork: boolean;
}
