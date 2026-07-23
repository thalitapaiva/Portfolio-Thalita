import * as React from "react";

import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-12 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium",
        "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]",
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
Input.displayName = "Input";
