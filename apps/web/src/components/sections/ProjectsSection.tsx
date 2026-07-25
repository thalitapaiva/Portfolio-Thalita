"use client";

import * as React from "react";
import type { ProjectSummaryDto } from "@portfolio/types";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { useLang } from "@/lib/i18n";

interface ProjectsSectionProps {
  projects: ProjectSummaryDto[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  const { t } = useLang();

  const visible = showAll ? projects : projects.slice(0, 6);
  const hasMore = projects.length > 6;

  return (
    <section id="projetos" aria-labelledby="projects-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 md:gap-6 md:pb-16">
          <div className="max-w-2xl" data-aos="zoom-y-out">
            <h2
              id="projects-title"
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl"
            >
              {t.projects.title}
            </h2>
            <p className="mt-3 hidden text-lg text-gray-600 dark:text-gray-400 sm:mt-4 sm:block">
              {t.projects.description}
            </p>
          </div>
          {hasMore ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="min-h-11 w-full rounded-lg border border-gray-200 px-4 text-sm font-medium text-blue-500 hover:bg-gray-50 sm:w-auto sm:border-0 sm:px-0 sm:hover:bg-transparent dark:border-gray-700 dark:hover:bg-gray-900"
            >
              {showAll ? t.projects.showLess : t.projects.showAll}
            </button>
          ) : null}
        </div>

        {visible.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {visible.map((project, i) => (
              <li key={project.id} data-aos="zoom-y-out" data-aos-delay={(i % 3) * 80}>
                <ProjectCard project={project} onOpen={setActiveSlug} compact />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{t.projects.empty}</p>
        )}
      </div>

      <ProjectModal slug={activeSlug} onOpenChange={(open) => !open && setActiveSlug(null)} />
    </section>
  );
}
