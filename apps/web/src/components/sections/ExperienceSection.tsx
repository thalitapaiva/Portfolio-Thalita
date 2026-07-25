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
        <div className="mx-auto max-w-3xl pb-8 text-center md:pb-16" data-aos="zoom-y-out">
          <h2
            id="experience-title"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl"
          >
            {t.experience.title}
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
            {t.experience.description}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {CASE_ORDER.map((id, index) => {
            const item = t.experience.cases[id];
            return (
              <article
                key={id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6 md:p-8"
                data-aos="zoom-y-out"
                data-aos-delay={index * 80}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:mt-3 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400 sm:mt-3 sm:line-clamp-none">
                  {item.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:block sm:space-y-2 sm:gap-0">
                  {item.activities.map((activity, activityIndex) => (
                    <li
                      key={activity}
                      className={
                        activityIndex >= 3
                          ? "hidden sm:flex sm:items-start sm:gap-2 sm:text-sm sm:font-medium sm:text-gray-800 dark:sm:text-gray-200"
                          : "inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 sm:flex sm:items-start sm:gap-2 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm sm:font-medium sm:text-gray-800 dark:sm:bg-transparent dark:sm:text-gray-200"
                      }
                    >
                      <span className="mt-1.5 hidden size-1.5 shrink-0 rounded-full bg-blue-500 sm:block" />
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
