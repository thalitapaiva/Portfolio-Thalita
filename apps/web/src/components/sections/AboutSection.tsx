"use client";

import type { PortfolioProfileDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GeometricMark } from "@/components/shared/GeometricMark";
import { useLang } from "@/lib/i18n";

interface AboutSectionProps {
  profile: PortfolioProfileDto | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const { lang, t } = useLang();

  const aboutPt =
    profile?.shortBio?.trim() ||
    profile?.aboutContent?.trim() ||
    t.about.body;
  const about = lang === "pt" ? aboutPt : t.about.body;

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="section-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20 xl:gap-28">
          <ScrollReveal>
            <SectionHeading id="about-title" title={t.about.title} />
          </ScrollReveal>

          <div className="relative max-w-2xl lg:pt-1">
            <GeometricMark
              variant="keycap"
              className="absolute -right-4 -top-10 size-16 opacity-45 sm:-right-6 sm:-top-12 sm:size-20"
            />

            <ScrollReveal delay={0.06}>
              <p className="relative text-[1.15rem] font-medium leading-[1.6] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[1.3rem] sm:leading-[1.55]">
                {about}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
