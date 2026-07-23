"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Subtle magnetic pull toward the pointer. Disabled under reduced motion.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const prefersReduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex will-change-transform", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
