import * as React from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  id?: string;
  className?: string;
  align?: "center" | "left";
  withAccentPeriod?: boolean;
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  id,
  className,
  align = "left",
  withAccentPeriod = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--blue-600)]">
          {eyebrow}
        </p>
      ) : (
        <div className="editorial-rule" aria-hidden="true" />
      )}
      <h2
        id={id}
        className="display-title text-[clamp(2.5rem,7vw,4.75rem)] text-[var(--text-primary)]"
      >
        {title}
        {withAccentPeriod ? (
          <span className="text-[var(--blue-600)]" aria-hidden="true">
            .
          </span>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-md text-[1.05rem] font-medium leading-relaxed tracking-[-0.025em] text-[var(--text-secondary)]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
