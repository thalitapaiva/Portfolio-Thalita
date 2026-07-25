"use client";

import Image from "next/image";

import { useLang, type SkillGroupId } from "@/lib/i18n";

const PRIMARY_GROUPS: SkillGroupId[] = ["technology", "operations", "agility"];

const LOGOS = [
  "/images/logo-01.svg",
  "/images/logo-02.svg",
  "/images/logo-03.svg",
  "/images/logo-04.svg",
  "/images/logo-05.svg",
  "/images/logo-06.svg",
  "/images/logo-07.svg",
  "/images/logo-08.svg",
  "/images/logo-09.svg",
];

export function SkillsSection() {
  const { t } = useLang();
  const { tools } = t.skills;

  return (
    <section id="competencias" aria-labelledby="skills-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pb-8 text-center md:pb-14" data-aos="zoom-y-out">
          <h2
            id="skills-title"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl"
          >
            {t.skills.title}
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
            {t.skills.description}
          </p>
        </div>

        <div className="relative mb-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:mb-14">
          <div className="flex w-max animate-infinite-scroll gap-8 py-3 hover:[animation-play-state:paused] sm:gap-10 sm:py-4">
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="flex h-12 w-24 shrink-0 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-16 sm:w-28 dark:opacity-80"
              >
                <Image src={src} alt="" width={88} height={32} className="max-h-7 w-auto sm:max-h-8" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-8" data-aos="zoom-y-out">
          {PRIMARY_GROUPS.map((groupId) => {
            const group = t.skills.groups[groupId];
            return (
              <div
                key={groupId}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
              >
                <p className="text-sm font-semibold text-blue-500">{group.title}</p>
                <ul className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:block sm:space-y-2 sm:gap-0">
                  {group.items.map((item, index) => (
                    <li
                      key={item}
                      className={
                        index >= 5
                          ? "hidden text-sm font-medium text-gray-800 sm:list-item dark:text-gray-200"
                          : "inline-flex rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 sm:block sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-sm"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:mt-10 sm:p-6 dark:border-gray-800 dark:bg-gray-900/50">
          <p className="text-sm font-semibold text-gray-500">{tools.title}</p>
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
            {[...tools.technology.items, ...tools.management.items].map((item, index) => (
              <span
                key={item}
                className={
                  index >= 10
                    ? "hidden rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 sm:inline-flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    : "inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                }
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
