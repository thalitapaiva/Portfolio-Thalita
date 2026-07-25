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
}: ProjectCardProps) {
  const techs = project.technologies
    .slice()
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
    .map((t) => t.technology)
    .slice(0, compact ? 3 : 5);

  const openProject = () => {
    if (onOpen) onOpen(project.slug);
  };

  const cover = project.coverUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={project.coverUrl}
      alt=""
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      loading="lazy"
    />
  ) : (
    <ProjectPreview
      title={project.title}
      slug={project.slug}
      className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900",
        className,
      )}
    >
      {onOpen ? (
        <button
          type="button"
          onClick={openProject}
          className="project-cover relative aspect-[16/10] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`Abrir ${project.title}`}
        >
          {cover}
        </button>
      ) : (
        <Link
          href={`/projetos/${project.slug}`}
          className="project-cover relative aspect-[16/10] w-full overflow-hidden"
          aria-label={project.title}
        >
          {cover}
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-base font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-lg">
            {onOpen ? (
              <button
                type="button"
                onClick={openProject}
                className="text-left hover:text-blue-500 focus-visible:outline-none"
              >
                {project.title}
              </button>
            ) : (
              <Link href={`/projetos/${project.slug}`} className="hover:text-blue-500">
                {project.title}
              </Link>
            )}
          </h3>
          <time className="shrink-0 text-xs font-medium text-gray-500" dateTime={String(project.year)}>
            {project.year}
          </time>
        </div>

        {project.shortDescription ? (
          <p className="line-clamp-2 hidden text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:block">
            {project.shortDescription}
          </p>
        ) : null}

        {techs.length > 0 ? (
          <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
            {techs.map((t) => t.name).join(" · ")}
          </p>
        ) : null}

        <div className="mt-auto pt-2">
          {onOpen ? (
            <button
              type="button"
              onClick={openProject}
              className="text-sm font-medium text-blue-500 hover:text-blue-600"
              aria-label={`Ver projeto ${project.title}`}
            >
              Ver -&gt;
            </button>
          ) : (
            <Link
              href={`/projetos/${project.slug}`}
              className="text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Ver -&gt;
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
