"use client";

import { DevIcon, resolveDevIcon } from "@/components/shared/DevIcon";
import { useLang, type SkillGroupId } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const PRIMARY_GROUPS: SkillGroupId[] = ["technology", "operations", "agility"];

type MarqueeSpeed = "normal" | "reverse" | "slow";

const SPEED_CLASS: Record<MarqueeSpeed, string> = {
  normal: "animate-infinite-scroll",
  reverse: "animate-infinite-scroll-reverse",
  slow: "animate-infinite-scroll-slow",
};

function SkillChip({ label }: { label: string }) {
  const icon = resolveDevIcon(label);

  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
      {icon ? <DevIcon name={icon} size={18} title={label} /> : null}
      {label}
    </span>
  );
}

function SkillsMarquee({
  items,
  speed = "normal",
  label,
}: {
  items: string[];
  speed?: MarqueeSpeed;
  label: string;
}) {
  const trackClass = cn(
    "flex w-max items-center gap-3 py-1 pr-3 group-hover:[animation-play-state:paused] sm:gap-4 sm:pr-4",
    SPEED_CLASS[speed],
  );

  return (
    <div
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      role="group"
      aria-label={label}
    >
      {/* Static wrap for reduced-motion / accessibility fallback */}
      <div className="hidden flex-wrap justify-center gap-2 motion-reduce:flex sm:gap-3">
        {items.map((item) => (
          <SkillChip key={`static-${item}`} label={item} />
        ))}
      </div>

      <div className="inline-flex w-max max-w-none flex-nowrap motion-reduce:hidden">
        <div className={trackClass}>
          {items.map((item) => (
            <SkillChip key={`a-${item}`} label={item} />
          ))}
        </div>
        <div className={trackClass} aria-hidden="true">
          {items.map((item) => (
            <SkillChip key={`b-${item}`} label={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { t } = useLang();
  const { tools } = t.skills;

  const technology = t.skills.groups.technology.items;
  const operationsAndAgility = [
    ...t.skills.groups.operations.items,
    ...t.skills.groups.agility.items,
  ];
  const toolItems = [...tools.technology.items, ...tools.management.items];

  return (
    <section id="competencias" aria-labelledby="skills-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pb-8 text-center md:pb-12" data-aos="zoom-y-out">
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

        <div className="space-y-4 sm:space-y-5" data-aos="zoom-y-out">
          <SkillsMarquee
            items={technology}
            speed="normal"
            label={t.skills.groups.technology.title}
          />
          <SkillsMarquee
            items={operationsAndAgility}
            speed="reverse"
            label={`${t.skills.groups.operations.title} · ${t.skills.groups.agility.title}`}
          />
          <SkillsMarquee items={toolItems} speed="slow" label={tools.title} />
        </div>

        {/* Visually hidden group titles for screen readers / nav context */}
        <ul className="sr-only">
          {PRIMARY_GROUPS.map((groupId) => {
            const group = t.skills.groups[groupId];
            return (
              <li key={groupId}>
                <p>{group.title}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
