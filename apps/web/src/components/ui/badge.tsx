import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--blue-300)]/20 text-[var(--blue-700)] border border-[var(--blue-300)]/40",
        outline: "border border-[var(--border)] text-[var(--text-secondary)]",
        solid: "bg-[var(--navy-900)] text-white",
        muted: "bg-[var(--background)] text-[var(--text-secondary)] border border-[var(--border)]",
        success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      },
      size: {
        sm: "px-2 py-0.5",
        md: "px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
