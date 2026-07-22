import * as React from "react";
import { ExternalLink, GitFork, Star } from "lucide-react";
import type { GitHubRepoDto } from "@portfolio/types";

import { Badge } from "@/components/ui/badge";
import { formatNumber, formatRelativeDate } from "@/lib/format";

interface GitHubRepoCardProps {
  repo: GitHubRepoDto;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  return (
    <article className="group flex h-full flex-col gap-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-card transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-[var(--blue-400)] motion-reduce:transform-none">
      <header className="flex items-start justify-between gap-3">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--blue-700)]"
        >
          {repo.name}
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          <span className="sr-only">(nova aba)</span>
        </a>
        {repo.archived && (
          <Badge variant="muted" size="sm">
            Arquivado
          </Badge>
        )}
      </header>

      <p className="line-clamp-3 flex-1 text-sm text-[var(--text-secondary)]">
        {repo.description ?? "Sem descrição."}
      </p>

      {repo.topics.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <li key={t}>
              <Badge variant="outline" size="sm">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--border)] pt-3 font-mono text-xs text-[var(--text-secondary)]">
        {repo.language && <span>{repo.language}</span>}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          {formatNumber(repo.stargazersCount)}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
          {formatNumber(repo.forksCount)}
        </span>
        <span className="ml-auto">{formatRelativeDate(repo.updatedAt)}</span>
      </footer>
    </article>
  );
}
