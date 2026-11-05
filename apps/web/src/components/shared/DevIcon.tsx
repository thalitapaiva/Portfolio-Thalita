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

/** Brand assets are served locally so unavailable icon CDNs cannot break the UI. */
const COLORFUL_SRC: Partial<Record<DevIconName, string>> = {
  html5: "/icons/html5.svg",
  css3: "/icons/css3.svg",
  javascript: "/icons/javascript.svg",
  typescript: "/icons/typescript.svg",
  react: "/icons/react.svg",
  nextjs: "/icons/nextjs.svg",
  nodejs: "/icons/nodejs.svg",
  c: "/icons/c.svg",
  postgresql: "/icons/postgresql.svg",
  mysql: "/icons/mysql.svg",
  git: "/icons/git.svg",
  github: "/icons/github.svg",
  vscode: "/icons/vscode.svg",
  figma: "/icons/figma.svg",
  docker: "/icons/docker.svg",
  linux: "/icons/linux.svg",
  python: "/icons/python.svg",
  java: "/icons/java.svg",
  nestjs: "/icons/nestjs.svg",
  tailwindcss: "/icons/tailwindcss.svg",
  prisma: "/icons/prisma.svg",
  npm: "/icons/npm.svg",
  jira: "/icons/jira.svg",
  trello: "/icons/trello.svg",
  markdown: "/icons/markdown.svg",
  postman: "/icons/postman.svg",
  vercel: "/icons/vercel.svg",
  slack: "/icons/slack.svg",
  notion: "/icons/notion.svg",
  miro: "/icons/miro.svg",
  googleworkspace: "/icons/googleworkspace.svg",
  chromedevtools: "/icons/chromedevtools.svg",
  excel: "/icons/excel.svg",
  teams: "/icons/teams.svg",
};

/** Black/white marks that need invert on dark backgrounds. */
const INVERT_IN_DARK = new Set<DevIconName>([
  "github",
  "vercel",
  "notion",
  "miro",
  "linux",
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
