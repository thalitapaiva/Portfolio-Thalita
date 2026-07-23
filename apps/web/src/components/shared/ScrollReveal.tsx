"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

type RevealTag = "div" | "section" | "article" | "li";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
  once?: boolean;
}

/**
 * Progressive enhancement: content is visible by default (SSR / no-JS / first paint).
 * After mount, a restrained fade-up runs when the block enters the viewport.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
  once = true,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (prefersReduced || !ready) {
    const Static = as;
    return <Static className={cn(className)}>{children}</Static>;
  }

  const motionProps = {
    initial: { opacity: 0.01, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, amount: 0.15 as const },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
    className: cn(className),
  };

  switch (as) {
    case "li":
      return <motion.li {...motionProps}>{children}</motion.li>;
    case "section":
      return <motion.section {...motionProps}>{children}</motion.section>;
    case "article":
      return <motion.article {...motionProps}>{children}</motion.article>;
    default:
      return <motion.div {...motionProps}>{children}</motion.div>;
  }
}
