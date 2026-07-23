import * as React from "react";
import { Github, Linkedin } from "lucide-react";
import type { SocialLinkDto } from "@portfolio/types";

import { SITE } from "@/lib/constants";

const PLATFORM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
};

interface SiteFooterProps {
  fullName?: string;
  shortPhrase?: string;
  email?: string;
  socialLinks?: SocialLinkDto[];
}

export function SiteFooter({
  fullName = SITE.name,
  shortPhrase = "Programação, processos e projetos.",
  socialLinks = [],
}: SiteFooterProps) {
  const year = new Date().getFullYear();
  const links = socialLinks.filter(
    (link) => !["email", "mail"].includes(link.platform.toLowerCase()),
  );

  return (
    <footer role="contentinfo" className="border-t border-[var(--border)] pb-[env(safe-area-inset-bottom)]">
      <div className="section-shell flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="text-[14px] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            {fullName}
          </p>
          <p className="text-[12px] font-medium tracking-[-0.015em] text-[var(--text-secondary)]">
            {shortPhrase}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const Icon = PLATFORM_ICON[link.platform.toLowerCase()] ?? Github;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 px-2 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-secondary)] transition-colors duration-300 touch-manipulation hover:text-[var(--text-primary)]"
                aria-label={link.label}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">{link.label}</span>
              </a>
            );
          })}
          <span className="ml-2 font-mono text-[11px] text-[var(--text-secondary)]">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
