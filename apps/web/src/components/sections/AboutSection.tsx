"use client";

import { useLang } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useLang();

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="space-y-4" data-aos="zoom-y-out">
          <h2
            id="about-title"
            className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl"
          >
            {t.about.title}
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            {t.about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
