"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GeometricMark } from "@/components/shared/GeometricMark";
import { useLang } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useLang();

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

            <div className="relative space-y-6">
              {t.about.paragraphs.map((paragraph, index) => (
                <ScrollReveal key={paragraph.slice(0, 24)} delay={0.06 + index * 0.05}>
                  <p className="text-[1.08rem] font-medium leading-[1.65] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[1.18rem] sm:leading-[1.6]">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
