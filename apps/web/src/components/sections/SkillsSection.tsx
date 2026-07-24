"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useLang, type SkillGroupId } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const PRIMARY_GROUPS: SkillGroupId[] = ["technology", "operations", "agility"];

export function SkillsSection() {
  const { t } = useLang();
  const tools = t.skills.groups.tools;

  return (
    <section id="competencias" aria-labelledby="skills-title" className="section-pad">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeading
            id="skills-title"
            title={t.skills.title}
            description={t.skills.description}
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-3 lg:gap-8">
          {PRIMARY_GROUPS.map((groupId, index) => {
            const group = t.skills.groups[groupId];
            return (
              <ScrollReveal key={groupId} delay={index * 0.05} y={20}>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--blue-700)]">
                    {group.title}
                  </p>
                  <ul className="mt-5 border-t border-[var(--border)]">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "border-b border-[var(--border)] py-3.5 text-[0.98rem] font-bold tracking-[-0.035em] text-[var(--text-primary)]",
                          "transition-colors duration-300 hover:text-[var(--blue-600)]",
                        )}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="mt-12 border-t border-[var(--border)] pt-8 sm:mt-14">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {tools.title}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex min-h-10 items-center border border-[var(--border)] px-4 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
