"use client";

import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { NAV_SECTIONS, SITE } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

interface SiteHeaderProps {
  monogram?: string;
  fullName?: string;
  githubUrl?: string;
}

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function SiteHeader({
  monogram = SITE.shortName,
  fullName = SITE.name,
  githubUrl,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const activeSection = useActiveSection(SECTION_IDS, 96);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-smooth",
        "backdrop-blur-md",
        scrolled
          ? "bg-[color:rgb(247_250_252_/_0.85)] border-b border-[var(--border)] shadow-[0_1px_0_rgba(28,43,62,0.04)]"
          : "bg-[color:rgb(247_250_252_/_0.6)]",
      )}
      aria-label="Cabeçalho principal"
    >
      <div className="mx-auto flex h-16 max-w-wide items-center gap-4 px-5 sm:px-8">
        <Link
          href="#inicio"
          className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)] rounded-md px-1"
          aria-label={`${fullName} — voltar ao início`}
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--navy-900)] font-mono text-xs font-semibold tracking-wider text-white transition-transform group-hover:-rotate-3"
          >
            {monogram}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-[var(--text-primary)] sm:inline">
            {fullName}
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {NAV_SECTIONS.map((section) => {
            const active = section.id === activeSection;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
                  active
                    ? "text-[var(--blue-700)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {section.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-all duration-200 ease-smooth",
                    active ? "bg-[var(--blue-600)] opacity-100" : "opacity-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {githubUrl && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label="Abrir perfil no GitHub"
              className="hidden sm:inline-flex"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          )}
          <Button asChild variant="primary" size="md" className="hidden md:inline-flex">
            <a href="#contato">Entre em contato</a>
          </Button>
          <MobileNav activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
}
