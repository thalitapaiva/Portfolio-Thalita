"use client";

import * as React from "react";
import type { SkillDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { DevIcon, resolveDevIcon, type DevIconName } from "@/components/shared/DevIcon";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface SkillsSectionProps {
  skills: SkillDto[];
}

const EXTRA_TOOLS: { name: string; icon: DevIconName }[] = [
  { name: "Next.js", icon: "nextjs" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "VS Code", icon: "vscode" },
];

type StackItem = {
  id: string;
  name: string;
  icon: DevIconName;
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLang();

  const items = React.useMemo(() => {
    const fromApi = skills
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name))
      .map((s): StackItem | null => {
        const icon =
          resolveDevIcon(s.icon) ??
          resolveDevIcon(s.name) ??
          resolveDevIcon(s.name.replace(/gest[aã]o/gi, "gestao"));
        if (!icon) return null;
        const name =
          icon === "projectmgmt" || /gest[aã]o de projetos|project management/i.test(s.name)
            ? t.skills.projectManagement
            : s.name;
        return {
          id: s.id,
          name,
          icon: icon === "trello" ? "projectmgmt" : icon,
        };
      })
      .filter((x): x is StackItem => x !== null);

    const seen = new Set(fromApi.map((s) => s.icon));
    const seenNames = new Set(fromApi.map((s) => s.name.toLowerCase()));
    const extras = EXTRA_TOOLS.filter(
      (tool) => !seen.has(tool.icon) && !seenNames.has(tool.name.toLowerCase()),
    ).map((tool) => ({
      id: `extra-${tool.icon}`,
      name: tool.name,
      icon: tool.icon,
    }));

    return [...fromApi, ...extras];
  }, [skills, t.skills.projectManagement]);

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

        <ScrollReveal delay={0.06}>
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-[var(--border)] sm:mt-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((s, index) => (
              <li key={s.id} className="border-b border-r border-[var(--border)]">
                <div
                  className={cn(
                    "group relative flex min-h-[8.25rem] flex-col items-start justify-between gap-5 bg-[var(--background)]/80 p-5 backdrop-blur-[2px] touch-manipulation sm:min-h-[9rem] sm:p-6",
                    "transition-[background,transform] duration-400 ease-premium",
                    "hover:bg-[color-mix(in_srgb,var(--blue-600)_8%,var(--background))]",
                    "focus-within:bg-[color-mix(in_srgb,var(--blue-600)_8%,var(--background))]",
                    "motion-safe:hover:-translate-y-0.5",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="font-mono text-[10px] font-medium tabular-nums text-[var(--blue-600)] opacity-55 transition-opacity duration-300 group-hover:opacity-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="skill-icon-shell motion-safe:group-hover:scale-105">
                      <DevIcon
                        name={s.icon}
                        size={28}
                        title={s.name}
                        className="transition-[opacity,transform] duration-400 ease-premium"
                      />
                    </span>
                  </div>
                  <span className="text-[0.98rem] font-bold tracking-[-0.04em] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--blue-600)] sm:text-[1.05rem]">
                    {s.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--blue-600)] transition-transform duration-400 ease-premium group-hover:scale-x-100"
                  />
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
