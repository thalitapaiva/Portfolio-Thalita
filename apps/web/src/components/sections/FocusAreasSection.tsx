"use client";

import Image from "next/image";
import { BriefcaseBusiness, Code2, UsersRound } from "lucide-react";

import { useLang, type FocusAreaId, type ExperienceCaseId } from "@/lib/i18n";

const AREA_ORDER: FocusAreaId[] = ["operations", "scrum", "technology"];
const AREA_ICON = {
  operations: BriefcaseBusiness,
  scrum: UsersRound,
  technology: Code2,
} as const;

const CASE_ORDER: ExperienceCaseId[] = [
  "planning",
  "agile",
  "reports",
  "standardization",
];

export function FocusAreasSection() {
  const { t } = useLang();

  return (
    <section
      id="atuacao"
      aria-labelledby="focus-title"
      className="relative overflow-x-clip before:absolute before:inset-0 before:-z-20 before:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-20">
        <div className="mx-auto max-w-3xl pb-10 text-center md:pb-16" data-aos="zoom-y-out">
          <h2
            id="focus-title"
            className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl"
          >
            {t.focus.title}
          </h2>
          <p className="mt-3 text-base text-gray-400 sm:mt-4 sm:text-lg">{t.focus.description}</p>
        </div>

        <div className="pb-10 md:pb-16" data-aos="zoom-y-out">
          <div className="flex justify-center">
            <div className="relative mx-auto w-[min(100%,280px)] overflow-hidden sm:w-[min(100%,360px)] md:w-[400px] md:overflow-visible">
              <div className="relative inline-flex w-full justify-center rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-pulse before:bg-gradient-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,#3b82f6,transparent)]">
                <Image
                  className="h-auto w-full rounded-full bg-gray-900"
                  src="/images/planet.png"
                  width={400}
                  height={400}
                  alt=""
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 400px"
                />
                <div className="pointer-events-none hidden md:block" aria-hidden="true">
                  <Image
                    className="absolute -right-64 -top-20 z-10 max-w-none"
                    src="/images/planet-overlay.svg"
                    width={789}
                    height={755}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-5 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] sm:*:p-6 md:*:p-10">
          {AREA_ORDER.map((id) => {
            const area = t.focus.areas[id];
            const Icon = AREA_ICON[id];
            return (
              <article key={id}>
                <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                  <Icon className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
                  <span>{area.title}</span>
                </h3>
                <p className="text-[15px] text-gray-400">{area.description}</p>
                <ul className="mt-3 space-y-1 sm:mt-4">
                  {area.skills.slice(0, 3).map((skill) => (
                    <li key={skill} className="text-sm text-gray-500">
                      · {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
          {CASE_ORDER.slice(0, 3).map((id) => {
            const item = t.experience.cases[id];
            return (
              <article key={id} className="hidden sm:block">
                <h3 className="mb-2 font-medium text-gray-200">{item.title}</h3>
                <p className="text-[15px] text-gray-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
