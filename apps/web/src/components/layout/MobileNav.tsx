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
import { NAV_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  activeSection: string;
  ctaHref?: string;
}

export function MobileNav({ activeSection, ctaHref = "#contato" }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const handleClick = React.useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu de navegação"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm border-[var(--border)] bg-[var(--background)] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <DialogTitle className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          Menu
        </DialogTitle>
        <nav aria-label="Navegação principal" className="mt-5">
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
                    <span>{section.label}</span>
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
              <a href={ctaHref}>Contato</a>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
