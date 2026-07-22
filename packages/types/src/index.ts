export type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "PRODUCT";

export type SkillLevel = "FAMILIAR" | "WORKING" | "PROFICIENT" | null;

export interface TechnologyDto {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

export interface SkillDto {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string | null;
  level?: SkillLevel;
  displayOrder: number;
}

export interface ProjectTechnologyDto {
  technology: TechnologyDto;
  isPrimary: boolean;
}

export interface ProjectSummaryDto {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  year: number;
  coverUrl?: string | null;
  repositoryUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  displayOrder: number;
  technologies: ProjectTechnologyDto[];
}

export interface ProjectDetailDto extends ProjectSummaryDto {
  fullDescription: string;
  problem: string;
  contribution: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkPrincipleDto {
  title: string;
  description: string;
}

export interface LinkedInPreviewDto {
  name: string;
  headline: string;
  summary: string;
  skills: string[];
  profileUrl: string;
}

export interface PortfolioProfileDto {
  id: string;
  fullName: string;
  monogram: string;
  heroLabel: string;
  headline: string;
  shortBio: string;
  aboutContent: string;
  education: string;
  interests: string;
  workStyle: string;
  goals: string;
  email: string;
  location?: string | null;
  workPrinciples: WorkPrincipleDto[];
  linkedIn: LinkedInPreviewDto;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface SocialLinkDto {
  id: string;
  label: string;
  url: string;
  platform: string;
  displayOrder: number;
}

export interface GitHubLanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export interface GitHubRepoDto {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  topics: string[];
  archived: boolean;
  fork: boolean;
}

export interface GitHubProfileDto {
  login: string;
  name: string | null;
  bio: string | null;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: GitHubLanguageStat[];
  repositories: GitHubRepoDto[];
  fetchedAt: string;
  fromCache: boolean;
  fromFallback: boolean;
}

export interface ContactRequestDto {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  website?: string; // honeypot
  turnstileToken?: string;
}

export interface ContactResponseDto {
  success: boolean;
  message: string;
}

export interface HealthDto {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  database: boolean;
  uptime: number;
}

export interface ApiErrorDto {
  statusCode: number;
  message: string | string[];
  error?: string;
}
