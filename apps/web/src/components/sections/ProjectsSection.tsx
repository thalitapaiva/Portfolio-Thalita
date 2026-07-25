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
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12 md:pb-16">
          <div className="max-w-2xl" data-aos="zoom-y-out">
            <h2
              id="projects-title"
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl"
            >
              {t.projects.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t.projects.description}
            </p>
          </div>
          {hasMore ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              {showAll ? t.projects.showLess : t.projects.showAll}
            </button>
          ) : null}
        </div>

        {visible.length > 0 ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
