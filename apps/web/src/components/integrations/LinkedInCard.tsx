import * as React from "react";
import { ExternalLink, Linkedin } from "lucide-react";
import type { LinkedInPreviewDto } from "@portfolio/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LinkedInCardProps {
  data: LinkedInPreviewDto;
}

export function LinkedInCard({ data }: LinkedInCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-card">
      <header className="flex items-start justify-between gap-4 border-b border-[var(--border)] bg-gradient-to-br from-[var(--blue-300)]/15 to-transparent p-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--blue-600)] text-white"
          >
            <Linkedin className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              LinkedIn
            </p>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{data.name}</h3>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 px-6 pb-6">
        <p className="text-sm font-medium text-[var(--text-primary)]">{data.headline}</p>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{data.summary}</p>

        {data.skills.length > 0 && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Habilidades destacadas
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {data.skills.slice(0, 10).map((s) => (
                <li key={s}>
                  <Badge variant="outline" size="sm">
                    {s}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-2">
          <Button asChild variant="primary" size="md">
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil no LinkedIn (nova aba)"
            >
              Ver no LinkedIn
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
