import * as React from "react";
import { Star, GitFork, Users, BookOpen } from "lucide-react";
import type { GitHubProfileDto } from "@portfolio/types";

import { formatNumber } from "@/lib/format";

interface GitHubStatsProps {
  github: GitHubProfileDto;
}

export function GitHubStats({ github }: GitHubStatsProps) {
  const totalForks = github.repositories.reduce((acc, r) => acc + r.forksCount, 0);
  const items = [
    { label: "Repositórios", value: github.publicRepos, icon: BookOpen },
    { label: "Stars", value: github.totalStars, icon: Star },
    { label: "Forks", value: totalForks, icon: GitFork },
    { label: "Seguidores", value: github.followers, icon: Users },
  ] as const;

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col gap-1 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </dt>
          <dd className="text-2xl font-semibold tabular-nums text-[var(--text-primary)]">
            {formatNumber(value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function GitHubLanguages({ github }: { github: GitHubProfileDto }) {
  if (github.topLanguages.length === 0) return null;
  return (
    <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        Linguagens mais usadas
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {github.topLanguages.map((l) => (
          <span
            key={l.name}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 font-mono text-xs text-[var(--text-primary)]"
          >
            {l.name}
            <span className="text-[var(--text-secondary)]">{l.percentage.toFixed(0)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}
