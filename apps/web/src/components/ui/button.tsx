import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-medium",
    "transition-colors duration-200 ease-smooth select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-60",
    "motion-reduce:transition-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--blue-600)] text-white hover:bg-[var(--blue-700)] shadow-card",
        secondary:
          "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--blue-400)] hover:text-[var(--blue-700)]",
        ghost:
          "bg-transparent text-[var(--text-primary)] hover:bg-[var(--blue-300)]/15",
        outline:
          "bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--blue-600)] hover:text-[var(--blue-700)]",
        link: "bg-transparent text-[var(--blue-700)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
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
