"use client";

import { RESULT_METRICS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useLang } from "@/lib/i18n";

export function ResultsSection() {
  const { t } = useLang();
  const published = RESULT_METRICS.filter(
    (metric) => metric.value !== null && metric.value !== "",
  );

  if (published.length === 0) return null;

  return (
    <section id="resultados" aria-labelledby="results-title" className="section-pad pt-0">
      <div className="section-shell">
        <ScrollReveal>
          <SectionHeading
            id="results-title"
            title={t.results.title}
            description={t.results.description}
          />
        </ScrollReveal>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((metric, index) => (
            <ScrollReveal as="li" key={metric.id} delay={(index % 3) * 0.05}>
              <div className="border border-[var(--border)] px-5 py-6">
                <p className="display-title text-[clamp(2rem,5vw,2.75rem)] text-[var(--text-primary)]">
                  {metric.value}
                  <span className="text-[var(--blue-600)]" aria-hidden="true">
                    .
                  </span>
                </p>
                <p className="mt-2 text-[13px] font-medium tracking-[-0.015em] text-[var(--text-secondary)]">
                  {t.results.items[metric.labelKey]}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
