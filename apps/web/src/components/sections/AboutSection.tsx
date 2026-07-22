import * as React from "react";
import type { PortfolioProfileDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

interface AboutSectionProps {
  profile: PortfolioProfileDto | null;
}

const FALLBACK_PRINCIPLES = [
  {
    title: "[PLACEHOLDER — Princípio 1]",
    description:
      "[PLACEHOLDER — Descreva como você aborda o trabalho: clareza, comunicação, iteração etc.]",
  },
  {
    title: "[PLACEHOLDER — Princípio 2]",
    description:
      "[PLACEHOLDER — Descreva um segundo princípio: qualidade, testes, foco no usuário etc.]",
  },
  {
    title: "[PLACEHOLDER — Princípio 3]",
    description:
      "[PLACEHOLDER — Descreva um terceiro princípio: colaboração, pragmatismo, evolução contínua etc.]",
  },
] as const;

export function AboutSection({ profile }: AboutSectionProps) {
  const about =
    profile?.aboutContent?.trim() ||
    "[PLACEHOLDER — Conteúdo sobre a Thalita: trajetória, valores e áreas de interesse. Este texto vem da API do portfólio.]";
  const principles =
    profile?.workPrinciples && profile.workPrinciples.length > 0
      ? profile.workPrinciples
      : FALLBACK_PRINCIPLES;

  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            id="about-title"
            eyebrow="Sobre"
            title="Um pouco sobre mim"
            description="Como penso, o que valorizo e o tipo de problema que gosto de resolver."
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ScrollReveal delay={0.05}>
            <div className="prose prose-slate max-w-none text-[15px] leading-relaxed text-[var(--text-primary)]">
              {about.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {profile?.education && (
              <ExtraBlock label="Formação" value={profile.education} />
            )}
            {profile?.interests && (
              <ExtraBlock label="Interesses" value={profile.interests} />
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:pl-8">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-card sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--blue-700)]">
                Como eu trabalho
              </h3>
              <ol className="mt-5 space-y-6">
                {principles.map((p, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[var(--blue-300)]/25 font-mono text-xs font-semibold text-[var(--blue-700)]"
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-[var(--text-primary)]">
                        {p.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {p.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ExtraBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-6 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
        {label}
      </p>
      <p className="mt-1 text-sm text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
