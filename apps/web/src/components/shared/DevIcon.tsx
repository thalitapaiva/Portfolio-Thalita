import * as React from "react";

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
  | "markdown"
  | "projectmgmt";

const DEVICON_SRC: Partial<Record<DevIconName, string>> = {
  react: "react/react-original.svg",
  nodejs: "nodejs/nodejs-original.svg",
  c: "c/c-original.svg",
  postgresql: "postgresql/postgresql-original.svg",
  mysql: "mysql/mysql-original.svg",
  git: "git/git-original.svg",
  github: "github/github-original.svg",
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
  trello: "trello/trello-original.svg",
  markdown: "markdown/markdown-original.svg",
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
    htmlcss: "html5",
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
    jira: "jira",
    trello: "trello",
    markdown: "markdown",
    gestaodeprojetos: "projectmgmt",
    gestodeprojetos: "projectmgmt",
    projectmanagement: "projectmgmt",
    projectmgmt: "projectmgmt",
    kanban: "projectmgmt",
    agile: "projectmgmt",
    scrum: "projectmgmt",
    layout: "figma",
    database: "postgresql",
    schema: "prisma",
    code: "vscode",
    check: "projectmgmt",
    chat: "markdown",
    users: "jira",
    book: "markdown",
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
    case "html5":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" />
          {/* Bold </> strokes — unmistakable at 24–32px */}
          <path
            d="M8.2 8.4 5 12l3.2 3.6"
            stroke="var(--background)"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8 8.4 19 12l-3.2 3.6"
            stroke="var(--background)"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.35 7.6 10.65 16.4"
            stroke="var(--background)"
            strokeWidth="2.15"
            strokeLinecap="round"
          />
        </InlineGlyph>
      );
    case "css3":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" />
          <path
            d="M7.4 7.8h9.2l-.7 7.6L12 17.8l-3.9-2.4-.2-2.1h2l.1 1 1.9.9 2-.9.3-2.8H8.2L7.4 7.8Z"
            fill="var(--background)"
          />
        </InlineGlyph>
      );
    case "nodejs":
      // Use original Devicon mark (CDN) — user preferred the earlier look
      return null;
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
          {/* Clean TS wordmark */}
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
    case "projectmgmt":
      return (
        <InlineGlyph size={size} title={title} className={className}>
          <rect x="3" y="4" width="5.5" height="16" rx="1.2" fill="currentColor" opacity="0.35" />
          <rect x="9.25" y="4" width="5.5" height="16" rx="1.2" fill="currentColor" opacity="0.65" />
          <rect x="15.5" y="4" width="5.5" height="16" rx="1.2" fill="currentColor" />
          <rect x="4.2" y="6.2" width="3.1" height="2.2" rx="0.5" fill="var(--background)" />
          <rect x="10.45" y="6.2" width="3.1" height="3.4" rx="0.5" fill="var(--background)" />
          <rect x="16.7" y="6.2" width="3.1" height="4.6" rx="0.5" fill="var(--background)" />
        </InlineGlyph>
      );
    default:
      return null;
  }
}

/**
 * Brand-blue icons. Critical stack glyphs are inline SVGs (always visible);
 * others use Devicon CDN with a blue color filter.
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
