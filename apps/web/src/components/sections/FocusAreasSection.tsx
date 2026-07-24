"use client";

import { BriefcaseBusiness, Code2, UsersRound } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useLang, type FocusAreaId } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const AREA_ORDER: FocusAreaId[] = ["operations", "scrum", "technology"];

const AREA_ICON = {
  operations: BriefcaseBusiness,
  scrum: UsersRound,
  technology: Code2,
} as const;

export function FocusAreasSection() {
  const { t } = useLang();

  return (
    <section id="atuacao" aria-labelledby="focus-title" className="section-pad">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeading
            id="focus-title"
            title={t.focus.title}
            description={t.focus.description}
          />
        </ScrollReveal>

        <ul className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-3 lg:gap-5">
          {AREA_ORDER.map((id, index) => {
            const area = t.focus.areas[id];
            const Icon = AREA_ICON[id];
            return (
              <ScrollReveal as="li" key={id} delay={(index % 3) * 0.06} y={24}>
                <article
                  className={cn(
                    "group flex h-full flex-col border border-[var(--border)] bg-[var(--background)]/70 p-6 sm:p-7",
                    "transition-[border-color,background,transform] duration-400 ease-premium",
                    "hover:border-[var(--blue-400)] hover:bg-[color-mix(in_srgb,var(--blue-600)_6%,var(--background))]",
                    "motion-safe:hover:-translate-y-0.5",
                    "focus-within:border-[var(--blue-400)]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--blue-600)] opacity-60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-md border border-[var(--border)] text-[var(--blue-600)]",
                        "transition-colors duration-300 group-hover:border-[var(--blue-400)]",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-[1.2rem] font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-[1.3rem]">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed tracking-[-0.02em] text-[var(--text-secondary)]">
                    {area.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-[var(--border)] pt-5">
                    {area.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-start gap-2 text-[13px] font-medium tracking-[-0.015em] text-[var(--text-primary)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-[var(--blue-600)]"
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
