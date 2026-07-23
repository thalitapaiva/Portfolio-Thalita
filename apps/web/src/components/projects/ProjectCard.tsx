"use client";

import * as React from "react";
import Link from "next/link";
import type { ProjectSummaryDto } from "@portfolio/types";

import { cn } from "@/lib/cn";
import { useLang } from "@/lib/i18n";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

interface ProjectCardProps {
  project: ProjectSummaryDto;
  onOpen?: (slug: string) => void;
  className?: string;
  compact?: boolean;
  featured?: boolean;
}

export function ProjectCard({
  project,
  onOpen,
  className,
  compact = false,
  featured = false,
}: ProjectCardProps) {
  const { t } = useLang();
  const localized = t.projectContent[project.slug];
  const title = localized?.title ?? project.title;
  const shortDescription = localized?.shortDescription ?? project.shortDescription;

  const techs = project.technologies
    .slice()
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
    .map((tech) => tech.technology)
    .slice(0, compact ? 3 : 5);

  const githubUrl = project.repositoryUrl?.trim() || null;
  const internalHref = `/projetos/${project.slug}`;
  const openLabel = githubUrl ? t.projects.openOnGithub(title) : title;
  const ctaLabel = githubUrl ? t.projects.viewOnGithub : t.projects.view;

  const openProject = () => {
    if (githubUrl) {
      window.open(githubUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (onOpen) onOpen(project.slug);
  };

  const cover = project.coverUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={project.coverUrl}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
      loading="lazy"
    />
  ) : (
    <ProjectPreview
      title={title}
      slug={project.slug}
      className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
    />
  );

  const coverClass = cn(
    "relative block w-full overflow-hidden bg-[color-mix(in_srgb,var(--blue-600)_6%,var(--background))]",
    featured ? "aspect-[16/9]" : "aspect-[16/10]",
  );

  const coverOverlay = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--navy-900)_28%,transparent)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />
  );

  const renderCover = () => {
    if (githubUrl) {
      return (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(coverClass, "project-cover")}
          aria-label={openLabel}
        >
          {cover}
          {coverOverlay}
        </a>
      );
    }
    if (onOpen) {
      return (
        <button
          type="button"
          onClick={openProject}
          className={cn(
            coverClass,
            "project-cover text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
          )}
          aria-label={openLabel}
        >
          {cover}
          {coverOverlay}
        </button>
      );
    }
    return (
      <Link href={internalHref} className={cn(coverClass, "project-cover")} aria-label={title}>
        {cover}
      </Link>
    );
  };

  const renderTitle = () => {
    if (githubUrl) {
      return (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-300 hover:text-[var(--blue-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
        >
          {title}
        </a>
      );
    }
    if (onOpen) {
      return (
        <button
          type="button"
          onClick={openProject}
          className="text-left transition-colors duration-300 hover:text-[var(--blue-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
        >
          {title}
        </button>
      );
    }
    return (
      <Link href={internalHref} className="transition-colors duration-300 hover:text-[var(--blue-600)]">
        {title}
      </Link>
    );
  };

  const renderCta = () => {
    if (githubUrl) {
      return (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex min-h-10 items-center gap-1.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
          aria-label={`${ctaLabel}: ${title}`}
        >
          {ctaLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      );
    }
    if (onOpen) {
      return (
        <button
          type="button"
          onClick={openProject}
          className="link-underline inline-flex min-h-10 items-center gap-1.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
          aria-label={`${ctaLabel} ${title}`}
        >
          {ctaLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      );
    }
    return (
      <Link
        href={internalHref}
        className="link-underline inline-flex min-h-10 items-center gap-1.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
      >
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </Link>
    );
  };

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-4 transition-transform duration-500 ease-premium",
        "motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {renderCover()}

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "min-w-0 font-bold tracking-[-0.04em] text-[var(--text-primary)]",
              featured ? "text-[1.35rem] sm:text-[1.55rem]" : "text-[1.1rem] sm:text-[1.2rem]",
            )}
          >
            {renderTitle()}
          </h3>
          <time
            className="shrink-0 pt-1 font-mono text-[11px] font-medium text-[var(--text-secondary)]"
            dateTime={String(project.year)}
          >
            {project.year}
          </time>
        </div>

        {shortDescription ? (
          <p
            className={cn(
              "text-[0.95rem] leading-relaxed tracking-[-0.02em] text-[var(--text-secondary)]",
              compact ? "line-clamp-2" : "line-clamp-3",
            )}
          >
            {shortDescription}
          </p>
        ) : null}

        {techs.length > 0 ? (
          <p
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--blue-700)]"
            aria-label={t.projects.technologies}
          >
            {techs.map((tech) => tech.name).join(" · ")}
          </p>
        ) : null}

        <div className="mt-auto pt-1">{renderCta()}</div>
      </div>
    </article>
  );
}
