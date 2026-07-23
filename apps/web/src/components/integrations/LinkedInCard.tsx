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
    <article className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-4 shadow-card backdrop-blur-sm sm:p-5">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--blue-600)] text-white"
        >
          <Linkedin className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-[var(--text-primary)]">
            {data.name}
          </h3>
          <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">{data.headline}</p>
        </div>
      </header>

      {data.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {data.skills.slice(0, 6).map((s) => (
            <li key={s}>
              <Badge variant="outline" size="sm">
                {s}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      <Button asChild variant="primary" size="sm" className="mt-1 min-h-10 w-full sm:w-auto">
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir LinkedIn"
        >
          Ver perfil
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
    </article>
  );
}
