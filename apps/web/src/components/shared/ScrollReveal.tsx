"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li";
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
  once = true,
  ...rest
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Static = as;
    return (
      <Static className={cn(className)} {...rest}>
        {children}
      </Static>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
