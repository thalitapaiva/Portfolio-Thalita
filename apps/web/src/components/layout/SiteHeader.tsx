"use client";

import * as React from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Home,
  Layers,
  UserRound,
  type LucideIcon,
} from "lucide-react";

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

export const NAV_ICONS: Record<NavSectionId, LucideIcon> = {
  inicio: Home,
  sobre: UserRound,
  atuacao: BriefcaseBusiness,
  competencias: Layers,
  experiencia: Code2,
  projetos: FolderKanban,
};

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

  const links = NAV_SECTIONS.filter((s) => s.id !== "inicio");

  return (
    <header className="fixed top-2 z-30 w-full md:top-6" aria-label={t.nav.headerAria}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-2 rounded-2xl bg-white/90 px-2 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(#f3f4f6,#e5e7eb)_border-box] before:[mask-composite:exclude] before:[mask:linear-gradient(#fff_0_0)_padding-box,_linear-gradient(#fff_0_0)] dark:bg-gray-900/90 dark:before:[background:linear-gradient(#1f2937,#111827)_border-box] sm:gap-3 sm:px-3">
          <div className="flex shrink-0 items-center">
            <Link
              href="#inicio"
              className="inline-flex items-center px-1.5 text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:px-2"
              aria-label={`${fullName} — ${t.nav.backHome}`}
            >
              <span className="sm:hidden">TP</span>
              <span className="hidden sm:inline">{fullName}</span>
            </Link>
          </div>

          {/* Icon nav — always visible, including mobile */}
          <nav
            aria-label={t.nav.mainAria}
            className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {links.map((section) => {
              const active = section.id === activeSection;
              const Icon = NAV_ICONS[section.id];
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-label={navLabels[section.id]}
                  aria-current={active ? "true" : undefined}
                  title={navLabels[section.id]}
                  className={cn(
                    "inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-medium transition-colors touch-manipulation sm:min-w-0 sm:px-2.5",
                    active
                      ? "bg-blue-500/10 text-blue-500"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2} />
                  <span className="hidden lg:inline">{navLabels[section.id]}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
