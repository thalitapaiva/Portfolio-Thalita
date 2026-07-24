"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useLang, type ExperienceCaseId } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const CASE_ORDER: ExperienceCaseId[] = [
  "planning",
  "agile",
  "reports",
  "standardization",
];

export function ExperienceSection() {
  const { t } = useLang();

  return (
    <section id="experiencia" aria-labelledby="experience-title" className="section-pad">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeading
            id="experience-title"
            title={t.experience.title}
            description={t.experience.description}
          />
        </ScrollReveal>

        <ol className="relative mt-12 space-y-0 sm:mt-14">
          {CASE_ORDER.map((id, index) => {
            const item = t.experience.cases[id];
            const isLast = index === CASE_ORDER.length - 1;
            return (
              <ScrollReveal as="li" key={id} delay={(index % 2) * 0.04} y={22}>
                <article
                  className={cn(
                    "grid gap-5 border-t border-[var(--border)] py-8 sm:grid-cols-[minmax(0,7rem)_minmax(0,1fr)] sm:gap-10 sm:py-10",
                    isLast && "border-b",
                  )}
                >
                  <div className="flex items-baseline gap-3 sm:block">
                    <span className="font-mono text-[12px] font-medium tabular-nums text-[var(--blue-600)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="max-w-3xl">
                    <h3 className="text-[1.2rem] font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-[1.35rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed tracking-[-0.02em] text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {item.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-start gap-2 text-[13px] font-medium tracking-[-0.015em] text-[var(--text-primary)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-full bg-[var(--blue-600)]"
                          />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
