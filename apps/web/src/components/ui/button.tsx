import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.02em]",
    "transition-all duration-300 ease-premium select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-60",
    "motion-reduce:transition-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "rounded-md bg-[var(--blue-600)] text-white shadow-[0_10px_28px_-14px_color-mix(in_srgb,var(--blue-600)_70%,transparent)] hover:brightness-[1.06] hover:shadow-[0_14px_32px_-12px_color-mix(in_srgb,var(--blue-600)_80%,transparent)] active:scale-[0.98] dark:text-[#060a12]",
        secondary:
          "rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--blue-400)] hover:bg-[color-mix(in_srgb,var(--surface)_50%,transparent)]",
        ghost:
          "rounded-md bg-transparent text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--surface)_55%,transparent)]",
        outline:
          "rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--blue-400)]",
        link: "bg-transparent text-[var(--blue-600)] underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-9 w-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        type={asChild ? undefined : (type ?? "button")}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
