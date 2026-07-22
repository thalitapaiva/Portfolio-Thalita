import * as React from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--blue-700)]">
          {eyebrow}
        </span>
      )}
      <Tag
        id={id}
        className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
