import * as React from "react";

import { cn } from "@/lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-[160px] w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm font-medium",
        "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] resize-y",
        "transition-colors duration-200 ease-premium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)] focus-visible:border-[var(--blue-600)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus-visible:ring-red-500",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
