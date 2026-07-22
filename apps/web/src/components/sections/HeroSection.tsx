import * as React from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Star, GitFork } from "lucide-react";
import type { GitHubProfileDto, PortfolioProfileDto } from "@portfolio/types";

import { Button } from "@/components/ui/button";
import { TechCanvas } from "@/components/shared/TechCanvas";
import { formatNumber } from "@/lib/format";

interface HeroSectionProps {
  profile: PortfolioProfileDto | null;
  github: GitHubProfileDto | null;
}

const FALLBACK = {
  fullName: "[PLACEHOLDER — Nome completo]",
  heroLabel: "PORTFOLIO / SOFTWARE / PRODUCT",
  headline: "[PLACEHOLDER — Headline curta e direta]",
  shortBio:
    "[PLACEHOLDER — Bio curta descrevendo áreas de atuação, tipo de problema que gosta de resolver e valor entregue. Máximo 3 linhas.]",
};

export function HeroSection({ profile, github }: HeroSectionProps) {
  const heroLabel = profile?.heroLabel ?? FALLBACK.heroLabel;
  const fullName = profile?.fullName ?? FALLBACK.fullName;
  const headline = profile?.headline ?? FALLBACK.headline;
  const shortBio = profile?.shortBio ?? FALLBACK.shortBio;
  const linkedInUrl = profile?.linkedIn?.profileUrl;
  const githubUrl = github?.htmlUrl;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(128,203,243,0.25),transparent_60%)]"
      />
      <div className="mx-auto grid max-w-wide items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--blue-700)]">
            {heroLabel}
          </p>
          <h1
            id="hero-title"
            className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[4rem] lg:leading-[1.02]"
          >
            {fullName}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--text-primary)] sm:text-xl">
            {headline}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            {shortBio}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button asChild variant="primary" size="lg">
              <a href="#projetos" aria-label="Ver projetos em destaque">
                Ver projetos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            {linkedInUrl && (
              <Button asChild variant="outline" size="lg">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir LinkedIn (nova aba)"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
            )}
          </div>

          {github && (
            <GitHubIndicators github={github} githubUrl={githubUrl} />
          )}
        </div>

        <div className="relative w-full lg:pl-4">
          <TechCanvas />
        </div>
      </div>
    </section>
  );
}

function GitHubIndicators({
  github,
  githubUrl,
}: {
  github: GitHubProfileDto;
  githubUrl?: string;
}) {
  const totalForks = github.repositories.reduce((acc, r) => acc + r.forksCount, 0);
  const items: Array<{ label: string; value: number; icon?: React.ReactNode }> = [
    { label: "Repos", value: github.publicRepos },
    { label: "Stars", value: github.totalStars, icon: <Star className="h-3 w-3" aria-hidden="true" /> },
    { label: "Forks", value: totalForks, icon: <GitFork className="h-3 w-3" aria-hidden="true" /> },
    { label: "Followers", value: github.followers },
  ];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[16px] border border-[var(--border)] bg-[var(--surface)]/70 p-3 pl-4 backdrop-blur">
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--blue-700)]"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          @{github.login}
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <Github className="h-4 w-4" aria-hidden="true" />@{github.login}
        </span>
      )}
      <span className="hidden h-4 w-px bg-[var(--border)] sm:inline-block" aria-hidden="true" />
      <dl className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-1.5 font-mono text-xs">
            <dt className="inline-flex items-center gap-1 uppercase tracking-wider text-[var(--text-secondary)]">
              {it.icon}
              <span className={it.icon ? "sr-only" : ""}>{it.label}</span>
            </dt>
            <dd className="text-[var(--text-primary)]">{formatNumber(it.value)}</dd>
            {!it.icon && (
              <span aria-hidden="true" className="text-[10px] text-[var(--text-secondary)]">
                {it.label}
              </span>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
