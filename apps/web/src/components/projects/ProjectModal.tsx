"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import type { ProjectDetailDto } from "@portfolio/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/ErrorState";
import { getFallbackProject } from "@/lib/fallback-data";

interface ProjectModalProps {
  slug: string | null;
  onOpenChange: (open: boolean) => void;
}

async function fetchProject(slug: string): Promise<ProjectDetailDto> {
  const res = await fetch(`/api/backend/projects/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const fallback = getFallbackProject(slug);
    if (fallback) return fallback;
    throw new Error("Falha ao carregar projeto");
  }
  return (await res.json()) as ProjectDetailDto;
}

export function ProjectModal({ slug, onOpenChange }: ProjectModalProps) {
  const [project, setProject] = React.useState<ProjectDetailDto | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  React.useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setProject(null);
    setStatus("loading");
    fetchProject(slug)
      .then((data) => {
        if (!cancelled) {
          setProject(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const fallback = slug ? getFallbackProject(slug) : null;
  const githubUrl = project?.repositoryUrl ?? fallback?.repositoryUrl ?? null;

  return (
    <Dialog open={!!slug} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="project-modal-desc">
        {status === "loading" && (
          <div
            className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-[var(--text-secondary)]"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
            <p className="text-sm">Carregando detalhes do projeto…</p>
          </div>
        )}

        {status === "error" && (
          <ErrorState
            title="Projeto indisponível"
            description="Não foi possível carregar este projeto agora. Abra o repositório no GitHub."
            action={
              <div className="flex flex-wrap items-center justify-center gap-2">
                {githubUrl && (
                  <Button asChild variant="primary" size="sm">
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Ver no GitHub
                    </a>
                  </Button>
                )}
                {slug && (
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/projetos/${slug}`}>Abrir página</Link>
                  </Button>
                )}
              </div>
            }
          />
        )}

        {status === "success" && project && (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="muted" size="sm">{project.year}</Badge>
                {project.featured && <Badge variant="default" size="sm">Destaque</Badge>}
              </div>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription id="project-modal-desc">
                {project.shortDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6">
              <Block label="Problema" text={project.problem} />
              <Block label="Contribuição" text={project.contribution} />
              <Block label="Descrição" text={project.fullDescription} />

              {project.technologies.length > 0 && (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    Stack
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map(({ technology, isPrimary }) => (
                      <li key={technology.id}>
                        <Badge variant={isPrimary ? "default" : "outline"} size="sm">
                          {technology.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
                {project.repositoryUrl && (
                  <Button asChild variant="primary" size="sm">
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Ver no GitHub
                      <span className="sr-only">(nova aba)</span>
                    </a>
                  </Button>
                )}
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/projetos/${project.slug}`}>Página do projeto</Link>
                </Button>
                {project.liveUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Live
                      <span className="sr-only">(nova aba)</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <section aria-label={label}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--blue-700)]">
        {label}
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--text-primary)]">
        {text.split(/\n\n+/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
