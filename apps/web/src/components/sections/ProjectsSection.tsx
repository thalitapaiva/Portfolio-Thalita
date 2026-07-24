"use client";

import * as React from "react";
import type { ProjectSummaryDto } from "@portfolio/types";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  PROJECT_CATEGORY_BY_SLUG,
  type ProjectCategory,
} from "@/lib/constants";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface ProjectsSectionProps {
  projects: ProjectSummaryDto[];
}

type Filter = "all" | ProjectCategory;

function resolveCategory(slug: string): ProjectCategory {
  return PROJECT_CATEGORY_BY_SLUG[slug] ?? "technology";
}

const FILTER_MIN = 2;

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>("all");
  const { t } = useLang();

  const techCount = projects.filter((p) => resolveCategory(p.slug) === "technology").length;
  const opsCount = projects.filter((p) => resolveCategory(p.slug) === "operations").length;
  const showFilters = techCount >= FILTER_MIN && opsCount >= FILTER_MIN;

  const filtered =
    !showFilters || filter === "all"
      ? projects
      : projects.filter((p) => resolveCategory(p.slug) === filter);

  const visible = showAll ? filtered : filtered.slice(0, 6);
  const hasMore = filtered.length > 6;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.filterAll },
    { id: "technology", label: t.projects.filterTechnology },
    { id: "operations", label: t.projects.filterOperations },
  ];

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

        {showFilters ? (
          <ScrollReveal delay={0.04}>
            <div
              role="group"
              aria-label={t.projects.title}
              className="mt-8 flex flex-wrap gap-2"
            >
              {filters.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFilter(item.id);
                      setShowAll(false);
                    }}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex min-h-10 items-center border px-4 text-[13px] font-semibold tracking-[-0.02em] touch-manipulation",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
                      active
                        ? "border-[var(--blue-600)] bg-[color-mix(in_srgb,var(--blue-600)_12%,transparent)] text-[var(--blue-600)]"
                        : "border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--blue-600)] hover:text-[var(--blue-600)]",
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        ) : null}

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
