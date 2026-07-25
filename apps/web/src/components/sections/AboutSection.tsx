"use client";

import { useLang } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useLang();

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="space-y-5" data-aos="zoom-y-out">
          <h2
            id="about-title"
            className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl"
          >
            {t.about.title}
          </h2>
          <div className="space-y-3 text-center text-[15px] leading-relaxed text-gray-600 dark:text-gray-400 sm:space-y-4">
            {t.about.paragraphs.map((p, index) => (
              <p
                key={p.slice(0, 24)}
                className={index > 0 ? "hidden sm:block" : undefined}
              >
                {p}
              </p>
            ))}
          </div>

          <ul className="mt-2 grid gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
            {t.about.education.items.map((item) => (
              <li
                key={`${item.period}-${item.label}`}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                  {item.period}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-gray-800 dark:text-gray-200">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
