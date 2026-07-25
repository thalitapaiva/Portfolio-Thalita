"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { NAV_SECTIONS, SITE, type NavSectionId } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface SiteHeaderProps {
  fullName?: string;
  githubUrl?: string;
}

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function SiteHeader({ fullName = SITE.name }: SiteHeaderProps) {
  const activeSection = useActiveSection(SECTION_IDS, 96);
  const { t } = useLang();

  const navLabels: Record<NavSectionId, string> = {
    inicio: t.nav.home,
    sobre: t.nav.about,
    atuacao: t.nav.focus,
    competencias: t.nav.skills,
    experiencia: t.nav.experience,
    projetos: t.nav.projects,
  };

  return (
    <header className="fixed top-2 z-30 w-full md:top-6" aria-label={t.nav.headerAria}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(#f3f4f6,#e5e7eb)_border-box] before:[mask-composite:exclude] before:[mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] dark:bg-gray-900/90 dark:before:[background:linear-gradient(#1f2937,#111827)_border-box]">
          <div className="flex flex-1 items-center">
            <Link
              href="#inicio"
              className="inline-flex max-w-[9.5rem] items-center truncate px-1 text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:max-w-none sm:px-2"
              aria-label={`${fullName} — ${t.nav.backHome}`}
            >
              {fullName}
            </Link>
          </div>

          <nav
            aria-label={t.nav.mainAria}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
          >
            {NAV_SECTIONS.filter((s) => s.id !== "inicio").map((section) => {
              const active = section.id === activeSection;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "text-blue-500"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
                  )}
                >
                  {navLabels[section.id]}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild variant="primary" size="sm" className="hidden shadow-sm md:inline-flex">
              <a href="#projetos">{t.nav.projects}</a>
            </Button>
            <MobileNav activeSection={activeSection} />
          </div>
        </div>
      </div>
    </header>
  );
}
