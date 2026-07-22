import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import type { GitHubProfileDto } from "@portfolio/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/LoadingSkeleton";
import { GitHubStats, GitHubLanguages } from "@/components/integrations/GitHubStats";
import { GitHubRepoCard } from "@/components/integrations/GitHubRepoCard";

interface GitHubSectionProps {
  github: GitHubProfileDto | null;
}

export function GitHubSection({ github }: GitHubSectionProps) {
  return (
    <section
      id="github"
      aria-labelledby="github-title"
      className="scroll-mt-24 bg-[var(--surface)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              id="github-title"
              eyebrow="GitHub"
              title="Atividade open source"
              description="Repositórios públicos e estatísticas atualizadas a partir da API oficial do GitHub — sempre com cache no backend."
            />
            {github && (
              <Button asChild variant="outline" size="md">
                <a
                  href={github.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver perfil @${github.login} no GitHub (nova aba)`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  @{github.login}
                </a>
              </Button>
            )}
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-8">
          {!github ? (
            <div className="grid gap-6">
              <ErrorState
                title="GitHub indisponível"
                description="Não conseguimos carregar os dados do GitHub agora. Você pode visitar o perfil diretamente."
                action={
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/">Recarregar</Link>
                  </Button>
                }
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <ScrollReveal>
                <GitHubStats github={github} />
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <GitHubLanguages github={github} />
              </ScrollReveal>

              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  Repositórios em destaque
                </h3>
                {github.fromCache && (
                  <Badge variant="muted" size="sm">
                    Cache
                  </Badge>
                )}
              </div>

              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {github.repositories.slice(0, 6).map((repo, i) => (
                  <ScrollReveal as="li" key={repo.id} delay={(i % 3) * 0.05}>
                    <GitHubRepoCard repo={repo} />
                  </ScrollReveal>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
