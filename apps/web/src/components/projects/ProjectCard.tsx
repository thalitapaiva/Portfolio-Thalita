"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { ProjectSummaryDto } from "@portfolio/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: ProjectSummaryDto;
  onOpen?: (slug: string) => void;
  className?: string;
}

export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  const primaryTechs = project.technologies
    .filter((t) => t.isPrimary)
    .map((t) => t.technology.name);
  const secondaryTechs = project.technologies
    .filter((t) => !t.isPrimary)
    .map((t) => t.technology.name);
  const techs = [...primaryTechs, ...secondaryTechs].slice(0, 5);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface)] shadow-card transition-all duration-200 ease-smooth",
        "hover:-translate-y-0.5 hover:border-[var(--blue-400)] hover:shadow-soft motion-reduce:transform-none",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[var(--blue-300)]/20 via-[var(--surface)] to-[var(--blue-400)]/15"
      >
        <div className="absolute inset-0">
          <ProjectVisual seed={project.slug} />
        </div>
        <div className="absolute right-3 top-3">
          <Badge variant="muted" size="sm" className="bg-white/85 backdrop-blur">
            {project.year}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--blue-700)]">
            {project.title}
          </h3>
          {project.featured && (
            <Badge variant="default" size="sm">
              Destaque
            </Badge>
          )}
        </header>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.shortDescription}
        </p>

        {techs.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tecnologias principais">
            {techs.map((t) => (
              <li key={t}>
                <Badge variant="outline" size="sm">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
          {onOpen ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onOpen(project.slug)}
              aria-label={`Ver detalhes do projeto ${project.title}`}
            >
              Detalhes
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link
                href={`/projetos/${project.slug}`}
                aria-label={`Abrir página do projeto ${project.title}`}
              >
                Detalhes
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href={`/projetos/${project.slug}`}>Página do projeto</Link>
          </Button>
          <span className="ml-auto flex items-center gap-1">
            {project.repositoryUrl && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label={`Repositório de ${project.title} (nova aba)`}
              >
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label={`Site do projeto ${project.title} (nova aba)`}
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ seed }: { seed: string }) {
  const hash = React.useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [seed]);

  const lines = React.useMemo(() => {
    const arr: Array<{ w: number; y: number; opacity: number }> = [];
    for (let i = 0; i < 10; i++) {
      const w = 20 + ((hash >> (i * 2)) & 0x3f) * 1.5;
      arr.push({
        w: Math.min(220, Math.max(30, w)),
        y: 16 + i * 12,
        opacity: 0.35 + (((hash >> (i * 3)) & 0x7) / 7) * 0.6,
      });
    }
    return arr;
  }, [hash]);

  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`p-${seed}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" stroke="rgba(28,43,62,0.06)" fill="none" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#p-${seed})`} />
      <g transform="translate(20 20)">
        <rect
          width="280"
          height="140"
          rx="10"
          fill="rgba(255,255,255,0.85)"
          stroke="rgba(220,230,238,0.9)"
        />
        <g transform="translate(14 14)">
          <circle cx="6" cy="6" r="4" fill="#EF476F" opacity="0.7" />
          <circle cx="20" cy="6" r="4" fill="#FFD166" opacity="0.7" />
          <circle cx="34" cy="6" r="4" fill="#06D6A0" opacity="0.7" />
        </g>
        {lines.map((l, i) => (
          <rect
            key={i}
            x={14}
            y={l.y + 20}
            width={l.w}
            height={4}
            rx={2}
            fill="var(--blue-700)"
            opacity={l.opacity * 0.6}
          />
        ))}
      </g>
    </svg>
  );
}
