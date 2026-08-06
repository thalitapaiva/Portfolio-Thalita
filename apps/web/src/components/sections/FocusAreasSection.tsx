"use client";

import * as React from "react";
import { BriefcaseBusiness, Code2, UsersRound, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import { useLang, type FocusAreaId } from "@/lib/i18n";

const AREA_ORDER: FocusAreaId[] = ["operations", "scrum", "technology"];

const AREA_META: Record<
  FocusAreaId,
  { icon: LucideIcon; accent: string; glow: string }
> = {
  operations: {
    icon: BriefcaseBusiness,
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    glow: "bg-sky-500/20",
  },
  scrum: {
    icon: UsersRound,
    accent: "from-violet-500/25 via-blue-500/10 to-transparent",
    glow: "bg-violet-500/20",
  },
  technology: {
    icon: Code2,
    accent: "from-emerald-500/25 via-blue-500/10 to-transparent",
    glow: "bg-emerald-500/20",
  },
};

function FocusPanel({
  active,
  panelId,
}: {
  active: FocusAreaId;
  panelId?: string;
}) {
  const { t } = useLang();
  const prefersReduced = useReducedMotion();
  const activeArea = t.focus.areas[active];
  const ActiveIcon = AREA_META[active].icon;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={`focus-tab-${active}`}
      className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/80 p-5 sm:p-7"
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full blur-3xl transition-colors duration-500",
          AREA_META[active].glow,
        )}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-500 text-white">
              <ActiveIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-semibold text-gray-100">{activeArea.title}</p>
              <p className="text-sm text-gray-400">{activeArea.description}</p>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {activeArea.skills.map((skill, index) => (
              <motion.li
                key={skill}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: prefersReduced ? 0 : 0.04 * index,
                  duration: 0.22,
                }}
                className="inline-flex rounded-full border border-gray-700/80 bg-gray-900/90 px-3 py-1.5 text-sm font-medium text-gray-200 transition hover:border-blue-500/40 hover:text-white"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function FocusAreasSection() {
  const { t, lang } = useLang();
  const [active, setActive] = React.useState<FocusAreaId>("operations");
  const panelRefs = React.useRef<Partial<Record<FocusAreaId, HTMLDivElement | null>>>({});

  const hint =
    lang === "pt" ? "Toque em uma área para explorar" : "Tap an area to explore";

  const selectArea = React.useCallback((id: FocusAreaId) => {
    setActive(id);
    requestAnimationFrame(() => {
      const isMobile = window.matchMedia("(max-width: 639px)").matches;
      if (!isMobile) return;
      panelRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, []);

  return (
    <section
      id="atuacao"
      aria-labelledby="focus-title"
      className="relative overflow-x-clip before:absolute before:inset-0 before:-z-20 before:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-20">
        <div className="mx-auto max-w-3xl pb-8 text-center md:pb-12" data-aos="zoom-y-out">
          <h2
            id="focus-title"
            className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl"
          >
            {t.focus.title}
          </h2>
          <p className="mt-3 text-base text-gray-400 sm:mt-4 sm:text-lg">{t.focus.description}</p>
          <p className="mt-2 text-sm text-gray-500">{hint}</p>
        </div>

        <div
          className="grid gap-3 sm:grid-cols-3 sm:gap-4"
          data-aos="zoom-y-out"
          role="tablist"
          aria-label={t.focus.title}
        >
          {AREA_ORDER.map((id) => {
            const area = t.focus.areas[id];
            const Icon = AREA_META[id].icon;
            const selected = id === active;

            return (
              <React.Fragment key={id}>
                <button
                  type="button"
                  role="tab"
                  id={`focus-tab-${id}`}
                  aria-selected={selected}
                  aria-controls="focus-panel-mobile focus-panel-desktop"
                  onClick={() => selectArea(id)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 touch-manipulation sm:p-5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
                    selected
                      ? "border-blue-500/50 bg-gray-800/80 shadow-[0_0_0_1px_rgba(59,130,246,0.25)]"
                      : "border-gray-800 bg-gray-900/60 hover:border-gray-700 hover:bg-gray-800/50",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition duration-500",
                      AREA_META[id].accent,
                      selected && "opacity-100",
                      !selected && "group-hover:opacity-60",
                    )}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <span
                      className={cn(
                        "mb-3 inline-flex size-10 items-center justify-center rounded-xl transition",
                        selected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 text-blue-400 group-hover:bg-gray-700",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-100 sm:text-lg">{area.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{area.description}</p>
                    <span
                      className={cn(
                        "mt-3 inline-flex h-1 w-8 rounded-full transition-all duration-300",
                        selected ? "w-12 bg-blue-500" : "bg-gray-700 group-hover:bg-gray-600",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {selected ? (
                  <div
                    ref={(node) => {
                      panelRefs.current[id] = node;
                    }}
                    className="sm:hidden"
                  >
                    <FocusPanel active={id} panelId="focus-panel-mobile" />
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-5 hidden sm:mt-6 sm:block" data-aos="zoom-y-out">
          <FocusPanel active={active} panelId="focus-panel-desktop" />
        </div>
      </div>
    </section>
  );
}
