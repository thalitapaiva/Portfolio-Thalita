import * as React from "react";
import type { SkillCategory, SkillDto } from "@portfolio/types";
import { Code2, Server, Database, Cloud, Lightbulb } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { EmptyState } from "@/components/shared/EmptyState";

interface SkillsSectionProps {
  skills: SkillDto[];
}

const CATEGORY_ORDER: SkillCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "PRODUCT",
];

const CATEGORY_META: Record<
  SkillCategory,
  { label: string; description: string; icon: React.ComponentType<{ className?: string }> }
> = {
  FRONTEND: {
    label: "Frontend",
    description: "Interfaces acessíveis e performáticas",
    icon: Code2,
  },
  BACKEND: {
    label: "Backend",
    description: "APIs, serviços e integrações",
    icon: Server,
  },
  DATABASE: {
    label: "Bancos de dados",
    description: "Modelagem e consultas eficientes",
    icon: Database,
  },
  DEVOPS: {
    label: "DevOps",
    description: "CI/CD, containers e observabilidade",
    icon: Cloud,
  },
  PRODUCT: {
    label: "Produto",
    description: "Discovery, métricas e priorização",
    icon: Lightbulb,
  },
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const grouped = React.useMemo(() => {
    const map = new Map<SkillCategory, SkillDto[]>();
    for (const s of skills) {
      const list = map.get(s.category) ?? [];
      list.push(s);
      map.set(s.category, list);
    }
    for (const [, list] of map) {
      list.sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));
    }
    return map;
  }, [skills]);

  return (
    <section
      id="competencias"
      aria-labelledby="skills-title"
      className="scroll-mt-24 bg-[var(--surface)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            id="skills-title"
            eyebrow="Competências"
            title="Ferramentas do dia a dia"
            description="Tecnologias e áreas com as quais tenho experiência prática. Organizadas por domínio, sem barras de progresso — mais útil ver o contexto do que uma nota."
          />
        </ScrollReveal>

        {skills.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Competências indisponíveis"
              description="Não conseguimos carregar as competências agora. Tente novamente em instantes."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_ORDER.map((cat, i) => {
              const items = grouped.get(cat);
              if (!items || items.length === 0) return null;
              const meta = CATEGORY_META[cat];
              const Icon = meta.icon;
              return (
                <ScrollReveal key={cat} delay={i * 0.05}>
                  <article className="group flex h-full flex-col gap-4 rounded-[16px] border border-[var(--border)] bg-[var(--background)] p-5 shadow-card transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-[var(--blue-400)] hover:shadow-soft motion-reduce:transform-none">
                    <header className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-10 w-10 place-items-center rounded-[10px] bg-[var(--blue-300)]/20 text-[var(--blue-700)]"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-[var(--text-primary)]">
                          {meta.label}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {meta.description}
                        </p>
                      </div>
                    </header>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <li key={s.id}>
                          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--text-primary)] transition-colors group-hover:border-[var(--blue-300)]/60">
                            {s.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
