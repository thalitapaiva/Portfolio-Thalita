"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/cn";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)] leading-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span aria-hidden="true" className="ml-0.5 text-red-500">
        *
      </span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = "Label";
