"use client";

import * as React from "react";
import type { ProjectSummaryDto } from "@portfolio/types";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLang } from "@/lib/i18n";

interface ProjectsSectionProps {
  projects: ProjectSummaryDto[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = React.useState(false);
  const { t } = useLang();

  const visible = showAll ? projects : projects.slice(0, 6);
  const hasMore = projects.length > 6;

  return (
    <section id="projetos" aria-labelledby="projects-title" className="section-pad">
      <div className="section-shell">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="projects-title"
              title={t.projects.title}
              description={t.projects.description}
            />

            {hasMore ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="link-underline mb-1 min-h-10 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
              >
                {showAll ? t.projects.showLess : t.projects.showAll}
              </button>
            ) : null}
          </div>
        </ScrollReveal>

        {visible.length > 0 ? (
          <ul className="mt-12 grid gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {visible.map((project, i) => (
              <ScrollReveal as="li" key={project.id} delay={(i % 3) * 0.05} y={24}>
                <ProjectCard project={project} compact />
              </ScrollReveal>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-[1rem] text-[var(--text-secondary)]">
            {t.projects.empty}
          </p>
        )}
      </div>
    </section>
  );
}
