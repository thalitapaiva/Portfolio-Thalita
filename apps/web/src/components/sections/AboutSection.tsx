import * as React from "react";
import type { PortfolioProfileDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GeometricMark } from "@/components/shared/GeometricMark";

interface AboutSectionProps {
  profile: PortfolioProfileDto | null;
}

const DEFAULT_ABOUT =
  "Estudante de SI na UFES. Full stack com foco em produtos que resolvem problemas reais.";

function shortenAbout(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length <= 160) return trimmed;
  const cut = trimmed.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : 157).trim()}…`;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const about = shortenAbout(
    profile?.shortBio?.trim() ||
      profile?.aboutContent?.trim() ||
      DEFAULT_ABOUT,
  );

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="section-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20 xl:gap-28">
          <ScrollReveal>
            <SectionHeading id="about-title" title="Sobre" />
          </ScrollReveal>

          <div className="relative max-w-xl lg:pt-1">
            <GeometricMark
              variant="keycap"
              className="absolute -right-4 -top-10 size-16 opacity-45 sm:-right-6 sm:-top-12 sm:size-20"
            />

            <ScrollReveal delay={0.06}>
              <p className="relative text-[1.2rem] font-medium leading-[1.55] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[1.35rem] sm:leading-[1.5]">
                {about}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="relative mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-7">
                {["Português", "English"].map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex min-h-10 items-center border border-[var(--border)] px-4 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] transition-colors duration-300 hover:border-[var(--blue-600)] hover:text-[var(--blue-600)]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
