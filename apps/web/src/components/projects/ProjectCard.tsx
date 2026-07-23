"use client";

import * as React from "react";
import Link from "next/link";
import type { ProjectSummaryDto } from "@portfolio/types";

import { cn } from "@/lib/cn";
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
  const techs = project.technologies
    .slice()
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
    .map((t) => t.technology)
    .slice(0, compact ? 3 : 4);

  const openProject = () => {
    if (onOpen) onOpen(project.slug);
  };

  const cover = project.coverUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={project.coverUrl}
      alt=""
      className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
      loading="lazy"
    />
  ) : (
    <ProjectPreview
      title={project.title}
      slug={project.slug}
      className="transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
    />
  );

  const coverClass = cn(
    "relative w-full overflow-hidden bg-[color-mix(in_srgb,var(--blue-600)_6%,var(--background))]",
    featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]",
  );

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-5 transition-transform duration-500 ease-premium",
        "motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {onOpen ? (
        <button
          type="button"
          onClick={openProject}
          className={cn(
            coverClass,
            "project-cover text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
          )}
          aria-label={`Abrir ${project.title}`}
        >
          {cover}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--navy-900)_28%,transparent)] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </button>
      ) : (
        <Link
          href={`/projetos/${project.slug}`}
          className={cn(coverClass, "project-cover")}
          aria-label={project.title}
        >
          {cover}
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "min-w-0 font-bold tracking-[-0.04em] text-[var(--text-primary)]",
              featured ? "text-[1.45rem] sm:text-[1.7rem]" : "text-[1.15rem] sm:text-[1.25rem]",
            )}
          >
            {onOpen ? (
              <button
                type="button"
                onClick={openProject}
                className="text-left transition-colors duration-300 hover:text-[var(--blue-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
              >
                {project.title}
              </button>
            ) : (
              <Link
                href={`/projetos/${project.slug}`}
                className="transition-colors duration-300 hover:text-[var(--blue-600)]"
              >
                {project.title}
              </Link>
            )}
          </h3>
          <time
            className="shrink-0 font-mono text-[11px] font-medium text-[var(--text-secondary)]"
            dateTime={String(project.year)}
          >
            {project.year}
          </time>
        </div>

        {techs.length > 0 && (
          <p
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--blue-700)]"
            aria-label="Tecnologias"
          >
            {techs.map((t) => t.name).join(" · ")}
          </p>
        )}

        <div className="mt-auto pt-3">
          {onOpen ? (
            <button
              type="button"
              onClick={openProject}
              className="link-underline inline-flex min-h-10 items-center gap-1.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
              aria-label={`Ver projeto ${project.title}`}
            >
              Ver
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          ) : (
            <Link
              href={`/projetos/${project.slug}`}
              className="link-underline inline-flex min-h-10 items-center gap-1.5 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
            >
              Ver
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
