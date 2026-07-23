"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import { useLang, type Lang } from "@/lib/i18n";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  const options: Lang[] = ["pt", "en"];

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn(
        "inline-flex h-10 items-center rounded-md border border-[var(--border)] p-0.5",
        className,
      )}
    >
      {options.map((option) => {
        const active = lang === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={active}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center px-2.5 text-[11px] font-bold tracking-[0.06em] touch-manipulation",
              "transition-colors duration-300 ease-premium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
              active
                ? "rounded-[6px] bg-[color-mix(in_srgb,var(--blue-600)_14%,transparent)] text-[var(--blue-600)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            )}
          >
            {option === "pt" ? t.language.pt : t.language.en}
          </button>
        );
      })}
    </div>
  );
}
