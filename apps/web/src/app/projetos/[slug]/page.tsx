import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const revalidate = 900;

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [profile, project] = await Promise.all([api.getProfile(), api.getProject(slug)]);
  if (!project) {
    return buildMetadata({ profile, title: "Projeto não encontrado", path: `/projetos/${slug}` });
  }
  return buildMetadata({
    profile,
    title: project.title,
    description: project.shortDescription,
    path: `/projetos/${slug}`,
  });
}

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await api.getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [profile, project, github, socialLinks] = await Promise.all([
    api.getProfile(),
    api.getProject(slug),
    api.getGithub(),
    api.getSocialLinks(),
  ]);

  if (!project) notFound();

  return (
    <>
      <SiteHeader fullName={profile?.fullName} githubUrl={github?.htmlUrl} />
      <main className="pt-28 pb-16 sm:pt-32">
        <article className="mx-auto max-w-content px-5 sm:px-8">
          <nav aria-label="Trilha de navegação" className="mb-6">
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--blue-700)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar para projetos
            </Link>
          </nav>

          <header className="flex flex-col gap-4 border-b border-[var(--border)] pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="muted" size="sm">
                {project.year}
              </Badge>
              {project.featured && <Badge variant="default" size="sm">Destaque</Badge>}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg text-[var(--text-secondary)]">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {project.repositoryUrl && (
                <Button asChild variant="primary" size="md">
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
              {project.liveUrl && (
                <Button asChild variant="secondary" size="md">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Ver ao vivo
                    <span className="sr-only">(nova aba)</span>
                  </a>
                </Button>
              )}
            </div>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-14">
            <div className="space-y-10">
              <Section label="Problema" text={project.problem} />
              <Section label="Minha contribuição" text={project.contribution} />
              <Section label="Descrição completa" text={project.fullDescription} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-card">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--blue-700)]">
                  Tecnologias
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map(({ technology, isPrimary }) => (
                    <li key={technology.id}>
                      <Badge variant={isPrimary ? "default" : "outline"} size="sm">
                        {technology.name}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-dashed border-[var(--border)] p-5">
                <p className="text-sm text-[var(--text-secondary)]">
                  Quer conversar sobre este projeto?
                </p>
                <Button asChild variant="secondary" size="sm" className="mt-3">
                  <Link href="/#contato">Entrar em contato</Link>
                </Button>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <SiteFooter
        fullName={profile?.fullName}
        socialLinks={socialLinks}
      />
    </>
  );
}

function Section({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <section aria-labelledby={`sec-${label}`}>
      <p
        id={`sec-${label}`}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--blue-700)]"
      >
        {label}
      </p>
      <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-[var(--text-primary)]">
        {text.split(/\n\n+/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
