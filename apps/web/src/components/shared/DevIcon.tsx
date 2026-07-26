import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  BarChart3,
  BriefcaseBusiness,
  CalendarRange,
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

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE_BASE = "https://cdn.simpleicons.org";

/** Full-color brand marks (Devicon originals + Simple Icons). */
const COLORFUL_SRC: Partial<Record<DevIconName, string>> = {
  html5: `${DEVICON_BASE}/html5/html5-original.svg`,
  css3: `${DEVICON_BASE}/css3/css3-original.svg`,
  javascript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  typescript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  react: `${DEVICON_BASE}/react/react-original.svg`,
  nextjs: `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  nodejs: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  c: `${DEVICON_BASE}/c/c-original.svg`,
  postgresql: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  mysql: `${DEVICON_BASE}/mysql/mysql-original.svg`,
  git: `${DEVICON_BASE}/git/git-original.svg`,
  github: `${DEVICON_BASE}/github/github-original.svg`,
  vscode: `${DEVICON_BASE}/vscode/vscode-original.svg`,
  figma: `${DEVICON_BASE}/figma/figma-original.svg`,
  docker: `${DEVICON_BASE}/docker/docker-original.svg`,
  linux: `${DEVICON_BASE}/linux/linux-original.svg`,
  python: `${DEVICON_BASE}/python/python-original.svg`,
  java: `${DEVICON_BASE}/java/java-original.svg`,
  nestjs: `${DEVICON_BASE}/nestjs/nestjs-original.svg`,
  tailwindcss: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  prisma: `${DEVICON_BASE}/prisma/prisma-original.svg`,
  npm: `${DEVICON_BASE}/npm/npm-original-wordmark.svg`,
  jira: `${DEVICON_BASE}/jira/jira-original.svg`,
  trello: `${DEVICON_BASE}/trello/trello-original.svg`,
  markdown: `${DEVICON_BASE}/markdown/markdown-original.svg`,
  // Brands missing from Devicon — Simple Icons (brand colors)
  postman: `${SIMPLE_BASE}/postman/FF6C37`,
  vercel: `${SIMPLE_BASE}/vercel`,
  slack: `${SIMPLE_BASE}/slack`,
  notion: `${SIMPLE_BASE}/notion`,
  miro: `${SIMPLE_BASE}/miro`,
  excel: `${SIMPLE_BASE}/microsoftexcel/217346`,
  powerbi: `${SIMPLE_BASE}/powerbi/F2C811`,
  teams: `${SIMPLE_BASE}/microsoftteams/6264A7`,
  googleworkspace: `${SIMPLE_BASE}/google/4285F4`,
  azuredevops: `${SIMPLE_BASE}/azuredevops/0078D7`,
  chromedevtools: `${SIMPLE_BASE}/googlechrome`,
};

/** Black/white marks that need invert on dark backgrounds. */
const INVERT_IN_DARK = new Set<DevIconName>([
  "github",
  "vercel",
  "notion",
  "nextjs",
]);

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
};

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

/**
 * Colorful brand icons for tech/tools; lucide (accent blue) for process skills.
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

  const src = COLORFUL_SRC[name];
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      title={title}
      loading="lazy"
      decoding="async"
      className={cn(
        "select-none object-contain",
        INVERT_IN_DARK.has(name) && "dark:invert",
        className,
      )}
      aria-hidden="true"
    />
  );
}
