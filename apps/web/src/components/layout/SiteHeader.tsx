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
import { NavigationMenuNav } from "@/components/layout/NavigationMenuNav";
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
        {/* Simple border: mask-composite gradient borders paint opaque on Instagram/WebKit */}
        <div className="relative flex h-12 items-center justify-between gap-1.5 rounded-2xl border border-gray-200/80 bg-white/90 px-2 shadow-lg shadow-black/[0.03] backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/90 sm:h-14 sm:gap-3 sm:px-3">
          <div className="relative z-10 flex shrink-0 items-center">
            <Link
              href="#inicio"
              className="inline-flex items-center px-1.5 text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:px-2"
              aria-label={`${fullName} — ${t.nav.backHome}`}
            >
              <span className="sm:hidden">TP</span>
              <span className="hidden sm:inline">{fullName}</span>
            </Link>
          </div>

          {/* Mobile / tablet: compact icon nav (hidden on lg+; desktop menu below) */}
          <nav
            aria-label={t.nav.mainAria}
            className="relative z-10 flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
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
                    "inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-xl px-1.5 text-sm font-medium transition-colors touch-manipulation sm:min-h-10 sm:min-w-0 sm:px-2.5",
                    active
                      ? "bg-blue-500/10 text-blue-500"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2} />
                  <span className="hidden md:inline lg:hidden">{navLabels[section.id]}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop: ReUI Navigation Menu — display:none below lg so no empty shell on mobile */}
          <div className="relative z-10 hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <NavigationMenuNav activeSection={activeSection} />
          </div>

          <div className="relative z-10 flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <LanguageToggle className="h-9 border-gray-200 dark:border-gray-700 [&_button]:h-8 [&_button]:min-w-8 [&_button]:px-2" />
            <ThemeToggle className="h-9 w-9" />
          </div>
        </div>
      </div>
    </header>
  );
}
