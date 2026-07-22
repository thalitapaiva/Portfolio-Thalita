import * as React from "react";
import type { PortfolioProfileDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LinkedInCard } from "@/components/integrations/LinkedInCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface LinkedInSectionProps {
  profile: PortfolioProfileDto | null;
}

export function LinkedInSection({ profile }: LinkedInSectionProps) {
  const data = profile?.linkedIn;

  return (
    <section
      id="linkedin"
      aria-labelledby="linkedin-title"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            id="linkedin-title"
            eyebrow="LinkedIn"
            title="Perfil profissional"
            description="Resumo publicado no LinkedIn, mantido a partir do painel do portfólio — sem scraping."
          />
        </ScrollReveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <ScrollReveal>
            {data ? (
              <LinkedInCard data={data} />
            ) : (
              <EmptyState
                title="Sem preview do LinkedIn"
                description="Os dados do LinkedIn aparecerão aqui quando estiverem publicados."
              />
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="flex h-full flex-col justify-between gap-4 rounded-[20px] border border-dashed border-[var(--border)] p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--blue-700)]">
                  Prefere conversar por outro canal?
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  Estou aberta a novas conversas.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Oportunidades técnicas, colaboração em projetos ou apenas trocar uma
                  ideia — o formulário logo abaixo cai direto no meu email.
                </p>
              </div>
              <a
                href="#contato"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--blue-600)] hover:text-[var(--blue-700)]"
              >
                Ir para o formulário →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
