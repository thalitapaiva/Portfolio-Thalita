import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "transition-all select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "rounded-lg bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-bottom text-white shadow-sm hover:bg-[length:100%_150%]",
        secondary:
          "rounded-lg bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        ghost:
          "rounded-lg bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
        outline:
          "rounded-lg border border-gray-200 bg-transparent text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100",
        link: "bg-transparent text-blue-500 underline-offset-4 hover:underline p-0 h-auto rounded-none shadow-none",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-sm",
        icon: "h-9 w-9 rounded-lg",
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
