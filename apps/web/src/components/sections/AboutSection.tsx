"use client";

import { GraduationCap, Languages, School } from "lucide-react";

import { useLang } from "@/lib/i18n";

const EDU_ICONS = [GraduationCap, School, Languages] as const;

export function AboutSection() {
  const { t } = useLang();
  const lead = t.about.paragraphs[0];
  const support = t.about.paragraphs[1];

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
          data-aos="zoom-y-out"
        >
          <div>
            <div className="mb-4 h-1 w-12 rounded-full bg-blue-500" aria-hidden="true" />
            <h2
              id="about-title"
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl"
            >
              {t.about.title}
            </h2>
            <p className="mt-5 max-w-md text-lg font-medium leading-snug tracking-tight text-gray-800 dark:text-gray-200">
              {lead}
            </p>
            {support ? (
              <p className="mt-3 hidden max-w-md text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:block">
                {support}
              </p>
            ) : null}
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              {t.about.education.title}
            </p>
            <ol className="relative space-y-0 border-l border-gray-200 dark:border-gray-800">
              {t.about.education.items.map((item, index) => {
                const Icon = EDU_ICONS[index] ?? GraduationCap;
                return (
                  <li key={`${item.period}-${item.label}`} className="relative pl-10 pb-8 last:pb-0">
                    <span className="absolute -left-4 top-0 flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-blue-500 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="font-mono text-[11px] font-semibold tracking-wide text-blue-500">
                      {item.period}
                    </p>
                    <p className="mt-1 text-[15px] font-semibold leading-snug text-gray-900 dark:text-gray-100">
                      {item.label}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
