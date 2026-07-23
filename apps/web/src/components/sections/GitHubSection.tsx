import * as React from "react";
import { Github } from "lucide-react";
import type { GitHubProfileDto } from "@portfolio/types";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ErrorState } from "@/components/shared/ErrorState";
import { GitHubStats } from "@/components/integrations/GitHubStats";

interface GitHubSectionProps {
  github: GitHubProfileDto | null;
}

export function GitHubSection({ github }: GitHubSectionProps) {
  return (
    <section id="github" aria-labelledby="github-title" className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading id="github-title" eyebrow="GitHub" title="Atividade" />
            {github && (
              <Button asChild variant="outline" size="sm" className="min-h-10">
                <a
                  href={github.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`@${github.login} no GitHub`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  @{github.login}
                </a>
              </Button>
            )}
          </div>
        </ScrollReveal>

        <div className="mt-5">
          {!github ? (
            <ErrorState title="GitHub indisponível" description="Tente novamente em breve." />
          ) : (
            <ScrollReveal>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 p-4 backdrop-blur-sm sm:p-5">
                <GitHubStats github={github} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
