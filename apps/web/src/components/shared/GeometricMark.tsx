import { cn } from "@/lib/cn";

interface GeometricMarkProps {
  className?: string;
  variant?: "corner" | "keycap" | "slash" | "frame";
}

/** Pure-blue geometric / tech accents — atmosphere only, never over type. */
export function GeometricMark({ className, variant = "corner" }: GeometricMarkProps) {
  if (variant === "keycap") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none select-none opacity-70 [perspective:800px]",
          className,
        )}
      >
        <div
          className="relative size-full"
          style={{ transform: "rotateX(18deg) rotateY(-26deg) rotateZ(-4deg)", transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 grid place-items-center rounded-[18%] border border-[color-mix(in_srgb,var(--blue-400)_40%,transparent)]"
            style={{
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--blue-300) 45%, white), color-mix(in srgb, var(--blue-600) 70%, var(--navy-900)) 60%, color-mix(in srgb, var(--blue-700) 75%, var(--navy-900)))",
              boxShadow:
                "inset 0 1px 0 rgb(255 255 255 / 0.3), 0 14px 28px color-mix(in srgb, var(--blue-600) 18%, transparent)",
              transform: "translateZ(12px)",
            }}
          >
            <span className="font-mono text-[clamp(0.85rem,2.2vw,1.15rem)] font-semibold tracking-[-0.06em] text-white/95">
              {"{ }"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "slash") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none h-px w-16 -rotate-[18deg] bg-gradient-to-r from-transparent via-[var(--blue-600)] to-transparent opacity-70",
          className,
        )}
      />
    );
  }

  if (variant === "frame") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none border border-[color-mix(in_srgb,var(--blue-600)_35%,transparent)]",
          className,
        )}
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={cn("pointer-events-none text-[var(--blue-600)]", className)}
      fill="none"
    >
      <path d="M2 14V2h12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M46 34v12H34" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
