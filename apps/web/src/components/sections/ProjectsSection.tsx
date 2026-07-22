"use client";

import * as React from "react";
import type { ProjectSummaryDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { EmptyState } from "@/components/shared/EmptyState";

interface ProjectsSectionProps {
  projects: ProjectSummaryDto[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);

  return (
    <section
      id="projetos"
      aria-labelledby="projects-title"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            id="projects-title"
            eyebrow="Projetos"
            title="Trabalhos selecionados"
            description="Uma seleção do que já entreguei. Clique para ver detalhes de problema, contribuição e stack."
          />
        </ScrollReveal>

        {projects.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Nenhum projeto publicado"
              description="Os projetos aparecerão aqui assim que forem publicados no painel."
            />
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ScrollReveal as="li" key={project.id} delay={(i % 3) * 0.05}>
                <ProjectCard project={project} onOpen={setActiveSlug} />
              </ScrollReveal>
            ))}
          </ul>
        )}
      </div>

      <ProjectModal
        slug={activeSlug}
        onOpenChange={(open) => !open && setActiveSlug(null)}
      />
    </section>
  );
}
