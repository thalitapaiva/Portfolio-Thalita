"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { GitHubProfileDto, PortfolioProfileDto } from "@portfolio/types";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/Magnetic";
import { GeometricMark } from "@/components/shared/GeometricMark";
import { useLang } from "@/lib/i18n";

interface HeroSectionProps {
  profile: PortfolioProfileDto | null;
  github: GitHubProfileDto | null;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection({ profile, github }: HeroSectionProps) {
  const prefersReduced = useReducedMotion();
  const { t } = useLang();
  const fullName = profile?.fullName ?? "Thalita Paiva";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0] ?? "Thalita";
  const rest = parts.slice(1).join(" ") || "Paiva";
  const linkedInUrl = profile?.linkedIn?.profileUrl;
  const githubUrl = github?.htmlUrl ?? "https://github.com/thalitapaiva";

  const line = (delay: number) =>
    prefersReduced
      ? undefined
      : {
          initial: { opacity: 0.9, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-end overflow-x-clip pb-[max(5.5rem,env(safe-area-inset-bottom))] pt-[max(7rem,calc(env(safe-area-inset-top)+5rem))] sm:items-center sm:pb-28 sm:pt-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <GeometricMark
          variant="keycap"
          className="absolute -right-6 top-[20%] size-[min(28vw,9.5rem)] opacity-60 sm:right-[5%] sm:top-[24%] sm:opacity-75"
        />
        <GeometricMark
          variant="frame"
          className="absolute right-[10%] top-[36%] hidden aspect-square w-[min(22vw,12rem)] rotate-6 opacity-50 lg:block"
        />
        <div className="absolute bottom-[18%] left-[6%] hidden h-24 w-px bg-gradient-to-b from-[var(--blue-600)] to-transparent opacity-50 sm:block" />
        <GeometricMark className="absolute bottom-[22%] left-[4%] hidden size-12 sm:block" />
      </div>

      <div className="section-shell relative z-10 w-full">
        <div className="max-w-4xl">
          <motion.div className="mb-8 flex items-center gap-3 sm:mb-10" {...line(0)}>
            <span className="editorial-rule" aria-hidden="true" />
            <span className="sr-only">{t.hero.portfolioSr}</span>
          </motion.div>

          <h1 id="hero-title" className="display-title text-[var(--text-primary)]">
            <motion.span className="block text-[clamp(3.5rem,14vw,8.75rem)]" {...line(0.05)}>
              {first}
            </motion.span>
            <motion.span
              className="mt-1 block text-[clamp(3.5rem,14vw,8.75rem)] text-[var(--blue-600)]"
              {...line(0.12)}
            >
              {rest}
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-[1.05rem] font-medium leading-snug tracking-[-0.03em] text-[var(--text-secondary)] sm:mt-10 sm:text-lg"
            {...line(0.22)}
          >
            {t.hero.headline}
          </motion.p>

          <motion.p
            className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed tracking-[-0.02em] text-[var(--text-secondary)] sm:text-[1.02rem]"
            {...line(0.28)}
          >
            {t.hero.intro}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-7 sm:mt-12 sm:flex-row sm:items-center sm:gap-8"
            {...line(0.34)}
          >
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Magnetic>
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="min-h-12 w-full touch-manipulation sm:w-auto"
                >
                  <a href="#projetos">
                    {t.hero.viewProjects}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </Magnetic>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="min-h-12 w-full touch-manipulation sm:w-auto"
              >
                <a href="#experiencia">{t.hero.viewExperience}</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-secondary)]">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline touch-manipulation hover:text-[var(--text-primary)]"
              >
                GitHub
              </a>
              {linkedInUrl ? (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline touch-manipulation hover:text-[var(--text-primary)]"
                >
                  LinkedIn
                </a>
              ) : null}
              <a
                href="#contato"
                className="link-underline touch-manipulation hover:text-[var(--text-primary)]"
              >
                {t.hero.contact}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {!prefersReduced ? (
        <a
          href="#sobre"
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-secondary)] sm:flex"
          aria-label={t.hero.scrollAbout}
        >
          <span className="scroll-cue" aria-hidden="true" />
        </a>
      ) : null}
    </section>
  );
}
