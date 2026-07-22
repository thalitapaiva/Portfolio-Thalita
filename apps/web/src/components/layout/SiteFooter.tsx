import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import type { SocialLinkDto } from "@portfolio/types";

import { NAV_SECTIONS, SITE } from "@/lib/constants";

const PLATFORM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  mail: Mail,
};

interface SiteFooterProps {
  fullName?: string;
  shortPhrase?: string;
  email?: string;
  socialLinks?: SocialLinkDto[];
}

export function SiteFooter({
  fullName = SITE.name,
  shortPhrase = "Software e produto com foco em pessoas.",
  email,
  socialLinks = [],
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="mx-auto grid max-w-wide gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--blue-700)]">
            Portfolio
          </p>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">{fullName}</h2>
          <p className="max-w-xs text-sm text-[var(--text-secondary)]">{shortPhrase}</p>
        </div>

        <nav aria-label="Navegação do rodapé" className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Navegação
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[var(--text-primary)] transition-colors hover:text-[var(--blue-700)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Contato & Redes
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 text-[var(--text-primary)] transition-colors hover:text-[var(--blue-700)]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {email}
                </a>
              </li>
            )}
            {socialLinks.map((link) => {
              const key = link.platform.toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? ExternalLink;
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--text-primary)] transition-colors hover:text-[var(--blue-700)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                    <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-wide flex-col items-start justify-between gap-3 px-5 py-5 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center sm:px-8">
          <p>
            © {year} {fullName}. Todos os direitos reservados.
          </p>
          <p className="font-mono">
            Feito com Next.js, TypeScript e Tailwind CSS ·{" "}
            <Link href="#inicio" className="underline underline-offset-4 hover:text-[var(--blue-700)]">
              voltar ao topo
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
