"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";
import { useLang } from "@/lib/i18n";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = theme;
  root.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  return <>{children}</>;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const { t } = useLang();

  React.useEffect(() => {
    setTheme(getPreferredTheme());
    setMounted(true);
  }, []);

  const toggle = React.useCallback(() => {
    setSpin(true);
    window.setTimeout(() => setSpin(false), 420);
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.theme.light : t.theme.dark}
      aria-pressed={isDark}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--text-secondary)] touch-manipulation",
        "transition-[color,background,transform] duration-300 ease-premium",
        "hover:bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] hover:text-[var(--text-primary)]",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex transition-transform duration-400 ease-premium motion-reduce:transition-none",
          spin && "rotate-[180deg] scale-110",
        )}
      >
        {isDark ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
