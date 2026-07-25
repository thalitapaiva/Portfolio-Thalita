"use client";

import { useLang, type ExperienceCaseId } from "@/lib/i18n";

const CASE_ORDER: ExperienceCaseId[] = [
  "planning",
  "agile",
  "reports",
  "standardization",
];

export function ExperienceSection() {
  const { t } = useLang();

  return (
    <section id="experiencia" aria-labelledby="experience-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16" data-aos="zoom-y-out">
          <h2
            id="experience-title"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl"
          >
            {t.experience.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t.experience.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CASE_ORDER.map((id, index) => {
            const item = t.experience.cases[id];
            return (
              <article
                key={id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8"
                data-aos="zoom-y-out"
                data-aos-delay={index * 80}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {item.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex items-start gap-2 text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
