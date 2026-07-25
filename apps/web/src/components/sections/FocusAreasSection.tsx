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
      className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20" data-aos="zoom-y-out">
          <h2 id="focus-title" className="text-3xl font-bold text-gray-200 md:text-4xl">
            {t.focus.title}
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t.focus.description}</p>
        </div>

        <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
          <div className="text-center">
            <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-pulse before:bg-gradient-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,#3b82f6,transparent)]">
              <Image
                className="rounded-full bg-gray-900"
                src="/images/planet.png"
                width={400}
                height={400}
                alt=""
              />
              <div className="pointer-events-none" aria-hidden="true">
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

        <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] md:*:p-10">
          {AREA_ORDER.map((id) => {
            const area = t.focus.areas[id];
            const Icon = AREA_ICON[id];
            return (
              <article key={id}>
                <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                  <Icon className="h-4 w-4 text-blue-500" aria-hidden="true" />
                  <span>{area.title}</span>
                </h3>
                <p className="text-[15px] text-gray-400">{area.description}</p>
                <ul className="mt-4 space-y-1">
                  {area.skills.slice(0, 4).map((skill) => (
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
              <article key={id}>
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
