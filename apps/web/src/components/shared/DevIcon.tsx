import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  BarChart3,
  BriefcaseBusiness,
  CalendarRange,
  Chrome,
  ClipboardList,
  FileText,
  FolderKanban,
  GitBranch,
  ListOrdered,
  ListTodo,
  MessagesSquare,
  Presentation,
  RefreshCw,
  Repeat2,
  ShieldAlert,
  UsersRound,
} from "lucide-react";

import { cn } from "@/lib/cn";

export type DevIconName =
  | "html5"
  | "css3"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "nodejs"
  | "c"
  | "postgresql"
  | "mysql"
  | "git"
  | "github"
  | "vscode"
  | "figma"
  | "docker"
  | "linux"
  | "python"
  | "java"
  | "nestjs"
  | "tailwindcss"
  | "prisma"
  | "npm"
  | "jira"
  | "trello"
  | "notion"
  | "miro"
  | "markdown"
  | "postman"
  | "vercel"
  | "slack"
  | "excel"
  | "powerbi"
  | "teams"
  | "googleworkspace"
  | "azuredevops"
  | "chromedevtools"
  /** Process / soft-skill glyphs (not brand logos). */
  | "documentation"
  | "projectmgmt"
  | "businessops"
  | "processmapping"
  | "kpis"
  | "prioritization"
  | "riskmgmt"
  | "continuousimprovement"
  | "scrum"
  | "kanban"
  | "backlog"
  | "sprintplanning"
  | "facilitation"
  | "stakeholders"
  | "multidisciplinary"
  | "impediments";

const DEVICON_SRC: Partial<Record<DevIconName, string>> = {
  html5: "html5/html5-original.svg",
  css3: "css3/css3-original.svg",
  react: "react/react-original.svg",
  nodejs: "nodejs/nodejs-original.svg",
  c: "c/c-original.svg",
  postgresql: "postgresql/postgresql-original.svg",
  mysql: "mysql/mysql-original.svg",
  git: "git/git-original.svg",
  vscode: "vscode/vscode-original.svg",
  figma: "figma/figma-original.svg",
  docker: "docker/docker-original.svg",
  linux: "linux/linux-original.svg",
  python: "python/python-original.svg",
  java: "java/java-original.svg",
  nestjs: "nestjs/nestjs-original.svg",
  tailwindcss: "tailwindcss/tailwindcss-original.svg",
  prisma: "prisma/prisma-original.svg",
  npm: "npm/npm-original-wordmark.svg",
  jira: "jira/jira-original.svg",
  markdown: "markdown/markdown-original.svg",
  postman: "postman/postman-original.svg",
  vercel: "vercel/vercel-original.svg",
  slack: "slack/slack-original.svg",
  azuredevops: "azuredevops/azuredevops-original.svg",
};

const LUCIDE_ICONS: Partial<Record<DevIconName, LucideIcon>> = {
  documentation: FileText,
  projectmgmt: FolderKanban,
  businessops: BriefcaseBusiness,
  processmapping: GitBranch,
  kpis: BarChart3,
  prioritization: ListOrdered,
  riskmgmt: ShieldAlert,
  continuousimprovement: RefreshCw,
  scrum: Repeat2,
  kanban: ClipboardList,
  backlog: ListTodo,
  sprintplanning: CalendarRange,
  facilitation: Presentation,
  stakeholders: MessagesSquare,
  multidisciplinary: UsersRound,
  impediments: Ban,
  chromedevtools: Chrome,
};

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Strip accents so "Gestão" → "gestao". */
function normalizeKey(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function resolveDevIcon(name?: string | null): DevIconName | null {
  if (!name) return null;
  const key = normalizeKey(name);
  const aliases: Record<string, DevIconName> = {
    html: "html5",
    html5: "html5",
    css: "css3",
    css3: "css3",
    js: "javascript",
    javascript: "javascript",
    ts: "typescript",
    typescript: "typescript",
    react: "react",
    next: "nextjs",
    nextjs: "nextjs",
    nextjsjs: "nextjs",
    node: "nodejs",
    nodejs: "nodejs",
    c: "c",
    postgres: "postgresql",
    postgresql: "postgresql",
    mysql: "mysql",
    git: "git",
    github: "github",
    vscode: "vscode",
    visualstudiocode: "vscode",
    figma: "figma",
    docker: "docker",
    linux: "linux",
    python: "python",
    java: "java",
    nest: "nestjs",
    nestjs: "nestjs",
    tailwind: "tailwindcss",
    tailwindcss: "tailwindcss",
    prisma: "prisma",
    npm: "npm",
    npmpnpm: "npm",
    jira: "jira",
    trello: "trello",
    notion: "notion",
    miro: "miro",
    markdown: "markdown",
    postman: "postman",
    vercel: "vercel",
    slack: "slack",
    excel: "excel",
    microsoftexcel: "excel",
    powerbi: "powerbi",
    microsoftpowerbi: "powerbi",
    teams: "teams",
    microsoftteams: "teams",
    googleworkspace: "googleworkspace",
    google: "googleworkspace",
    azuredevops: "azuredevops",
    chromedevtools: "chromedevtools",
    chrome: "chromedevtools",

    // Operations & projects (meaning-matched lucide glyphs — never brand logos)
    businessoperations: "businessops",
    gestaodeprojetos: "projectmgmt",
    gestodeprojetos: "projectmgmt",
    projectmanagement: "projectmgmt",
    projectmgmt: "projectmgmt",
    mapeamentodeprocessos: "processmapping",
    processmapping: "processmapping",
    gestaodeindicadores: "kpis",
    kpimanagement: "kpis",
    documentacao: "documentation",
    documentation: "documentation",
    priorizacao: "prioritization",
    prioritization: "prioritization",
    gestaoderiscos: "riskmgmt",
    riskmanagement: "riskmgmt",
    melhoriacontinua: "continuousimprovement",
    continuousimprovement: "continuousimprovement",

    // Agility (distinct process icons — never reuse Jira/Figma/etc.)
    scrum: "scrum",
    agile: "scrum",
    kanban: "kanban",
    gestaodebacklog: "backlog",
    backlogmanagement: "backlog",
    planejamentodesprints: "sprintplanning",
    sprintplanning: "sprintplanning",
    facilitacaodereunioes: "facilitation",
    meetingfacilitation: "facilitation",
    comunicacaocomstakeholders: "stakeholders",
    stakeholdercommunication: "stakeholders",
    timesmultidisciplinares: "multidisciplinary",
    multidisciplinaryteams: "multidisciplinary",
    crossfunctionalteams: "multidisciplinary",
    resolucaodeimpedimentos: "impediments",
    impedimentresolution: "impediments",

    // Generic fallbacks used elsewhere
    layout: "figma",
    database: "postgresql",
    schema: "prisma",
    code: "vscode",
    check: "projectmgmt",
    chat: "documentation",
    users: "multidisciplinary",
    book: "documentation",
    dom: "javascript",
  };
  return aliases[key] ?? null;
}

function InlineGlyph({
  children,
  size,
  title,
  className,
}: {
  children: React.ReactNode;
  size: number;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none text-[var(--blue-600)]", className)}
      aria-hidden="true"
      role="img"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Crisp on-brand glyphs for icons that often fail with CDN + color filters. */
function BrandGlyph({
  name,
  size,
  title,
  className,
}: {
  name: DevIconName;
  size: number;
  title?: string;
  className?: string;
}) {
  switch (name) {
    case "javascript":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="3.2" fill="currentColor" />
          <path
            d="M10.35 16.75c0 1.35-.75 2.05-2.05 2.05-.95 0-1.65-.45-2.05-1.1l1.15-.7c.2.35.45.6.85.6.4 0 .65-.2.65-.8v-4.55h1.45v4.5Zm3.85 2.05c-1.2 0-2-.6-2.4-1.35l1.15-.65c.25.45.6.7 1.15.7.5 0 .75-.2.75-.55 0-.4-.3-.55-1.05-.85l-.35-.15c-1-.4-1.65-1-1.65-2.15 0-1.15.9-2.05 2.25-2.05 1 0 1.7.35 2.15 1.2l-1.1.7c-.2-.35-.5-.5-.85-.5-.4 0-.6.2-.6.5 0 .35.2.5.9.75l.35.15c1.15.5 1.8 1.05 1.8 2.25 0 1.25-1 2.1-2.4 2.1Z"
            fill="var(--background)"
          />
        </InlineGlyph>
      );
    case "typescript":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="3.2" fill="currentColor" />
          <path
            d="M6.4 10.15h5.05v1.35H9.95V17.7H8.4v-6.2H6.4v-1.35Z"
            fill="var(--background)"
          />
          <path
            d="M16.85 17.85c-1.55 0-2.55-.8-2.9-1.85l1.3-.55c.2.5.7.95 1.55.95.7 0 1.1-.3 1.1-.75 0-.45-.35-.7-1.25-.95l-.5-.15c-1.35-.45-2.2-1.15-2.2-2.45 0-1.3 1.1-2.3 2.65-2.3 1.2 0 2.1.45 2.6 1.55l-1.25.6c-.25-.45-.65-.7-1.25-.7-.6 0-.95.3-.95.7 0 .45.3.65 1.15.95l.5.15c1.55.5 2.3 1.25 2.3 2.55 0 1.45-1.15 2.4-2.95 2.4Z"
            fill="var(--background)"
          />
        </InlineGlyph>
      );
    case "nextjs":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <circle cx="12" cy="12" r="9.5" fill="currentColor" />
          <path
            d="M9.15 7.85h1.45l4.15 6.25V7.85h1.5V16.3h-1.45L10.65 9.95V16.3H9.15V7.85Z"
            fill="var(--background)"
          />
        </InlineGlyph>
      );
    case "vercel":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path d="M12 2.5 22.5 20.5H1.5L12 2.5Z" fill="currentColor" />
        </InlineGlyph>
      );
    case "github":
      // Official GitHub mark (simple-icons) — crisp brand-blue via currentColor
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </InlineGlyph>
      );
    case "notion":
      // Notion mark (simple-icons silhouette)
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"
          />
        </InlineGlyph>
      );
    case "miro":
      // Miro mark (simple-icons silhouette) — never reuse Figma
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z"
          />
        </InlineGlyph>
      );
    case "trello":
      // Trello mark (simple-icons silhouette)
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M21.147 0H2.853A2.86 2.86 0 000 2.853v18.294A2.86 2.86 0 002.853 24h18.294A2.86 2.86 0 0024 21.147V2.853A2.86 2.86 0 0021.147 0zM10.34 17.287a.953.953 0 01-.953.953h-4a.954.954 0 01-.954-.953V5.38a.953.953 0 01.954-.953h4a.954.954 0 01.953.953zm9.233-5.467a.944.944 0 01-.953.947h-4a.947.947 0 01-.953-.947V5.38a.953.953 0 01.953-.953h4a.954.954 0 01.953.953z"
          />
        </InlineGlyph>
      );
    case "excel":
      // Microsoft Excel mark (simple-icons silhouette)
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"
          />
        </InlineGlyph>
      );
    case "powerbi":
      // Power BI stacked bars (simple-icons silhouette)
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6Zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5H8Zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5h-2Z"
          />
        </InlineGlyph>
      );
    case "teams":
      // Microsoft Teams mark (simple-icons silhouette)
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M20.625 8.127q-.55 0-1.025-.205-.475-.205-.832-.563-.358-.357-.563-.832Q18 6.053 18 5.502q0-.54.205-1.02t.563-.837q.357-.358.832-.563.474-.205 1.025-.205.54 0 1.02.205t.837.563q.358.357.563.837.205.48.205 1.02 0 .55-.205 1.025-.205.475-.563.832-.357.358-.837.563-.48.205-1.02.205zm0-3.75q-.469 0-.797.328-.328.328-.328.797 0 .469.328.797.328.328.797.328.469 0 .797-.328.328-.328.328-.797 0-.469-.328-.797-.328-.328-.797-.328zM24 10.002v5.578q0 .774-.293 1.46-.293.685-.803 1.194-.51.51-1.195.803-.686.293-1.459.293-.445 0-.908-.105-.463-.106-.85-.329-.293.95-.855 1.729-.563.78-1.319 1.336-.756.557-1.67.861-.914.305-1.898.305-1.148 0-2.162-.398-1.014-.399-1.805-1.102-.79-.703-1.312-1.664t-.674-2.086h-5.8q-.411 0-.704-.293T0 16.881V6.873q0-.41.293-.703t.703-.293h8.59q-.34-.715-.34-1.5 0-.727.275-1.365.276-.639.75-1.114.475-.474 1.114-.75.638-.275 1.365-.275t1.365.275q.639.276 1.114.75.474.475.75 1.114.275.638.275 1.365t-.275 1.365q-.276.639-.75 1.113-.475.475-1.114.75-.638.276-1.365.276-.188 0-.375-.024-.188-.023-.375-.058v1.078h10.875q.469 0 .797.328.328.328.328.797zM12.75 2.373q-.41 0-.78.158-.368.158-.638.434-.27.275-.428.639-.158.363-.158.773 0 .41.158.78.159.368.428.638.27.27.639.428.369.158.779.158.41 0 .773-.158.364-.159.64-.428.274-.27.433-.639.158-.369.158-.779 0-.41-.158-.773-.159-.364-.434-.64-.275-.275-.639-.433-.363-.158-.773-.158zM6.937 9.814h2.25V7.94H2.814v1.875h2.25v6h1.875zm10.313 7.313v-6.75H12v6.504q0 .41-.293.703t-.703.293H8.309q.152.809.556 1.5.405.691.985 1.19.58.497 1.318.779.738.281 1.582.281.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752zm5.25-1.547v-5.203h-3.75v6.855q.305.305.691.452.387.146.809.146.469 0 .879-.176.41-.175.715-.48.304-.305.48-.715t.176-.879Z"
          />
        </InlineGlyph>
      );
    case "googleworkspace":
      // Google “G” mark — recognizable stand-in for Workspace
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </InlineGlyph>
      );
    default:
      return null;
  }
}

/**
 * Brand-blue icons. Critical stack glyphs are inline SVGs (always visible);
 * process skills use lucide; others use Devicon CDN with a blue color filter.
 */
export function DevIcon({
  name,
  size = 28,
  className,
  title,
}: {
  name: DevIconName;
  size?: number;
  className?: string;
  title?: string;
}) {
  const inline = BrandGlyph({ name, size, title, className });
  if (inline) return inline;

  const Lucide = LUCIDE_ICONS[name];
  if (Lucide) {
    return (
      <Lucide
        size={size}
        strokeWidth={2}
        className={cn("select-none text-[var(--blue-600)]", className)}
        aria-hidden="true"
        {...(title ? { "aria-label": title } : {})}
      />
    );
  }

  const srcPath = DEVICON_SRC[name];
  if (!srcPath) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE}/${srcPath}`}
      alt=""
      width={size}
      height={size}
      title={title}
      loading="lazy"
      decoding="async"
      className={cn("icon-brand-tint select-none", className)}
      aria-hidden="true"
    />
  );
}
