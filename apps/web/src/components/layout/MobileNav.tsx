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
      <DialogContent className="max-w-sm">
        <DialogTitle>Navegação</DialogTitle>
        <nav aria-label="Navegação principal" className="mt-2">
          <ul className="flex flex-col divide-y divide-[var(--border)]">
            {NAV_SECTIONS.map((section) => {
              const active = section.id === activeSection;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={handleClick}
                    className={cn(
                      "flex items-center justify-between px-1 py-3 text-base font-medium transition-colors",
                      active
                        ? "text-[var(--blue-700)]"
                        : "text-[var(--text-primary)] hover:text-[var(--blue-700)]",
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    <span>{section.label}</span>
                    {active && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[var(--blue-600)]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-2 flex flex-col gap-2">
          <DialogClose asChild>
            <Button asChild variant="primary" size="lg">
              <a href={ctaHref}>Entre em contato</a>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
