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

  const featured = projects[0];
  const rest = projects.slice(1);
  const visibleRest = showAll ? rest : rest.slice(0, 5);
  const hasMore = rest.length > 5;

  return (
    <section id="projetos" aria-labelledby="projects-title" className="section-pad">
      <div className="section-shell">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="projects-title" title="Projetos" />

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

        {featured ? (
          <ScrollReveal delay={0.05} className="mt-12 sm:mt-16">
            <ProjectCard
              project={featured}
              onOpen={setActiveSlug}
              featured
              className="pb-2"
            />
          </ScrollReveal>
        ) : null}

        {visibleRest.length > 0 ? (
          <ul className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-3">
            {visibleRest.map((project, i) => (
              <ScrollReveal as="li" key={project.id} delay={(i % 3) * 0.05} y={24}>
                <ProjectCard project={project} onOpen={setActiveSlug} compact />
              </ScrollReveal>
            ))}
          </ul>
        ) : null}
      </div>

      <ProjectModal slug={activeSlug} onOpenChange={(open) => !open && setActiveSlug(null)} />
    </section>
  );
}
