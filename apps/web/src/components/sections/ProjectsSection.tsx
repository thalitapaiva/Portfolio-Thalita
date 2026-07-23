"use client";

import * as React from "react";
import type { ProjectSummaryDto } from "@portfolio/types";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";

interface ProjectsSectionProps {
  projects: ProjectSummaryDto[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const [showAll, setShowAll] = React.useState(false);

  const visible = showAll ? projects : projects.slice(0, 6);
  const hasMore = projects.length > 6;

  return (
    <section id="projetos" aria-labelledby="projects-title" className="section-pad">
      <div className="section-shell">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="projects-title"
              title="Projetos"
              description="Trabalhos selecionados — landing pages, UIs e exercícios de front-end."
            />

            {hasMore ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="link-underline mb-1 min-h-10 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
              >
                {showAll ? "Ver menos" : "Ver todos"}
              </button>
            ) : null}
          </div>
        </ScrollReveal>

        {visible.length > 0 ? (
          <ul className="mt-12 grid gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {visible.map((project, i) => (
              <ScrollReveal as="li" key={project.id} delay={(i % 3) * 0.05} y={24}>
                <ProjectCard project={project} onOpen={setActiveSlug} compact />
              </ScrollReveal>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-[1rem] text-[var(--text-secondary)]">
            Projetos em breve.
          </p>
        )}
      </div>

      <ProjectModal slug={activeSlug} onOpenChange={(open) => !open && setActiveSlug(null)} />
    </section>
  );
}
