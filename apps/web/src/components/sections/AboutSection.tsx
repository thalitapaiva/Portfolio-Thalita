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

            <ScrollReveal delay={0.22}>
              <div className="relative mt-10 border-t border-[var(--border)] pt-8">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--blue-700)]">
                  {t.about.education.title}
                </p>
                <ul className="mt-5 space-y-4">
                  {t.about.education.items.map((item) => (
                    <li
                      key={`${item.period}-${item.label}`}
                      className="grid gap-1 sm:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] sm:gap-6"
                    >
                      <span className="font-mono text-[12px] font-medium tabular-nums text-[var(--text-secondary)]">
                        {item.period}
                      </span>
                      <span className="text-[0.98rem] font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
