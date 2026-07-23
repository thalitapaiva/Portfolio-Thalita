"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { NAV_SECTIONS } from "@/lib/constants";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  activeSection: string;
  ctaHref?: string;
}

export function MobileNav({ activeSection, ctaHref = "#contato" }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const handleClick = React.useCallback(() => setOpen(false), []);
  const { t } = useLang();

  const navLabels: Record<(typeof NAV_SECTIONS)[number]["id"], string> = {
    inicio: t.nav.home,
    sobre: t.nav.about,
    competencias: t.nav.skills,
    projetos: t.nav.projects,
    contato: t.nav.contact,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t.nav.openMenu}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm border-[var(--border)] bg-[var(--background)] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            {t.nav.menu}
          </DialogTitle>
          <LanguageToggle />
        </div>
        <nav aria-label={t.nav.mainAria} className="mt-5">
          <ul className="flex flex-col">
            {NAV_SECTIONS.map((section) => {
              const active = section.id === activeSection;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={handleClick}
                    className={cn(
                      "flex min-h-12 items-center justify-between border-b border-[var(--border)] py-4 text-lg font-bold tracking-[-0.03em] transition-colors touch-manipulation",
                      active
                        ? "text-[var(--blue-600)]"
                        : "text-[var(--text-primary)] hover:text-[var(--blue-600)]",
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    <span>{navLabels[section.id]}</span>
                    {active ? (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--blue-600)]" />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-6">
          <DialogClose asChild>
            <Button asChild variant="primary" size="lg" className="min-h-12 w-full touch-manipulation">
              <a href={ctaHref}>{t.nav.contact}</a>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
