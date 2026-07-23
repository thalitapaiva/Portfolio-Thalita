"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { NAV_SECTIONS, SITE } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface SiteHeaderProps {
  fullName?: string;
  githubUrl?: string;
}

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function SiteHeader({ fullName = SITE.name }: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const activeSection = useActiveSection(SECTION_IDS, 96);
  const { t } = useLang();

  const navLabels: Record<(typeof NAV_SECTIONS)[number]["id"], string> = {
    inicio: t.nav.home,
    sobre: t.nav.about,
    competencias: t.nav.skills,
    projetos: t.nav.projects,
    contato: t.nav.contact,
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background,border-color,backdrop-filter] duration-400 ease-premium",
        scrolled
          ? "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_72%,transparent)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent",
      )}
      aria-label={t.nav.headerAria}
    >
      <div className="mx-auto flex h-14 max-w-wide items-center gap-6 px-5 sm:h-[4.25rem] sm:gap-8 sm:px-8 lg:px-12">
        <Link
          href="#inicio"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
          aria-label={`${fullName} — ${t.nav.backHome}`}
        >
          <span className="text-[13px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[14px]">
            {fullName}
          </span>
        </Link>

        <nav
          aria-label={t.nav.mainAria}
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {NAV_SECTIONS.filter((s) => s.id !== "inicio").map((section) => {
            const active = section.id === activeSection;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative px-3 py-2 text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 ease-premium",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
                  active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {navLabels[section.id]}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 bottom-1 h-px origin-left bg-[var(--blue-600)] transition-transform duration-350 ease-premium",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 md:ml-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button asChild variant="primary" size="sm" className="hidden md:inline-flex">
            <a href="#contato">{t.nav.contact}</a>
          </Button>
          <MobileNav activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
}
