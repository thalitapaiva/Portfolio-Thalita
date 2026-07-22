import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/cn";

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function ErrorState({
  title = "Não foi possível carregar",
  description = "Tente novamente em alguns instantes.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="max-w-md text-sm text-[var(--text-secondary)]">{description}</p>
      {action}
    </div>
  );
}
