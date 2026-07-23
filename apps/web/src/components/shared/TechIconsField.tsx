"use client";

import * as React from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type FloatItem = {
  kind: "keycap" | "chip" | "bracket" | "cursor";
  label?: string;
  className: string;
  delay: string;
  duration: string;
  rotate: string;
};

/** Side-anchored tech objects — never through the reading column. */
const FLOATS: FloatItem[] = [
  {
    kind: "keycap",
    label: "{}",
    className: "left-[2%] top-[14%] hidden sm:block scale-[0.72] md:scale-[0.85] lg:scale-100",
    delay: "0s",
    duration: "11s",
    rotate: "rotateX(18deg) rotateY(-28deg) rotateZ(-6deg)",
  },
  {
    kind: "keycap",
    label: "</>",
    className: "right-[3%] top-[22%] hidden md:block scale-[0.78] lg:scale-95",
    delay: "-2.4s",
    duration: "13s",
    rotate: "rotateX(22deg) rotateY(32deg) rotateZ(8deg)",
  },
  {
    kind: "chip",
    className: "left-[4%] bottom-[18%] hidden sm:block scale-[0.7] md:scale-[0.85]",
    delay: "-4s",
    duration: "14s",
    rotate: "rotateX(12deg) rotateY(18deg) rotateZ(-10deg)",
  },
  {
    kind: "bracket",
    label: "[ ]",
    className: "right-[5%] bottom-[24%] hidden lg:block",
    delay: "-1.2s",
    duration: "12s",
    rotate: "rotateX(16deg) rotateY(-22deg) rotateZ(4deg)",
  },
  {
    kind: "cursor",
    className: "right-[8%] top-[58%] hidden sm:block scale-90 md:scale-100",
    delay: "-6s",
    duration: "10s",
    rotate: "rotateX(8deg) rotateY(14deg) rotateZ(12deg)",
  },
  {
    kind: "keycap",
    label: "⌘",
    className: "left-[6%] top-[48%] hidden xl:block scale-90",
    delay: "-3.5s",
    duration: "15s",
    rotate: "rotateX(20deg) rotateY(-18deg) rotateZ(5deg)",
  },
];

function Keycap({ label }: { label: string }) {
  return (
    <div className="tech-keycap">
      <div className="tech-keycap__body">
        <span className="tech-keycap__legend">{label}</span>
      </div>
      <div className="tech-keycap__side" />
      <div className="tech-keycap__bottom" />
    </div>
  );
}

function Chip() {
  return (
    <div className="tech-chip">
      <div className="tech-chip__die">
        <span className="tech-chip__pad" />
        <span className="tech-chip__pad" />
        <span className="tech-chip__pad" />
        <span className="tech-chip__pad" />
        <span className="tech-chip__core" />
      </div>
      <div className="tech-chip__pins tech-chip__pins--l" />
      <div className="tech-chip__pins tech-chip__pins--r" />
    </div>
  );
}

function BracketGlyph({ label }: { label: string }) {
  return (
    <div className="tech-bracket">
      <span>{label}</span>
    </div>
  );
}

function CursorGlyph() {
  return (
    <svg
      className="tech-cursor"
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 2 L4 30 L12 22 L18 36 L22 34 L16 20 L28 20 Z"
        fill="var(--blue-600)"
        fillOpacity="0.85"
        stroke="color-mix(in srgb, var(--blue-300) 70%, white)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Cinematic tech atmosphere — grid, circuit edges, floating 3D keycaps / chips.
 * Strictly behind content; vignette keeps type readable.
 */
export function SiteBackdrop() {
  const prefersReduced = useReducedMotion();
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (prefersReduced) return;

    let lastMove = 0;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 40) return;
      lastMove = now;
      const x = (event.clientX / Math.max(window.innerWidth, 1)) * 100;
      const y = (event.clientY / Math.max(window.innerHeight, 1)) * 100;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(ellipse 55% 45% at ${x}% ${y}%, color-mix(in srgb, var(--blue-600) 12%, transparent), transparent 70%)`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [prefersReduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--background)]" />

      {/* Brand washes — soft, not orbs */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -20%, color-mix(in srgb, var(--blue-600) 16%, transparent), transparent 60%), radial-gradient(ellipse 40% 35% at 96% 88%, color-mix(in srgb, var(--blue-400) 10%, transparent), transparent 55%), radial-gradient(ellipse 32% 28% at 4% 72%, color-mix(in srgb, var(--blue-300) 8%, transparent), transparent 50%)",
        }}
      />

      <div
        ref={glowRef}
        className={cn(
          "absolute inset-0 transition-[background] duration-700 ease-premium",
          prefersReduced ? "opacity-0" : "opacity-100",
        )}
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 70% 30%, color-mix(in srgb, var(--blue-600) 10%, transparent), transparent 70%)",
        }}
      />

      {/* Code / technical grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.5] dark:opacity-[0.35]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="tech-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M64 0H0V64"
              fill="none"
              stroke="var(--blue-600)"
              strokeWidth="0.65"
              strokeOpacity="0.32"
            />
            <path
              d="M32 0V8M0 32H8"
              fill="none"
              stroke="var(--blue-400)"
              strokeWidth="0.55"
              strokeOpacity="0.35"
            />
          </pattern>
          <radialGradient id="grid-fade" cx="50%" cy="40%" r="66%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" mask="url(#grid-mask)" />
      </svg>

      {/* Circuit traces — edges only */}
      <svg
        className={cn(
          "absolute inset-0 h-full w-full opacity-[0.5] dark:opacity-[0.36]",
          !prefersReduced && "tech-circuit-pulse",
        )}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="circuit-fade" cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="55%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="circuit-mask">
            <rect width="1440" height="900" fill="url(#circuit-fade)" />
          </mask>
        </defs>
        <g
          mask="url(#circuit-mask)"
          fill="none"
          stroke="var(--blue-600)"
          strokeWidth="1.1"
          strokeLinecap="square"
        >
          <path d="M40 120 H180 V200 H280" opacity="0.45" className="tech-trace" />
          <path d="M80 80 V160 H140 V240" opacity="0.35" className="tech-trace" />
          <circle cx="180" cy="120" r="3.5" fill="var(--blue-400)" stroke="none" opacity="0.55" />
          <circle cx="280" cy="200" r="3" fill="var(--blue-600)" stroke="none" opacity="0.5" />
          <rect x="268" y="188" width="24" height="24" opacity="0.35" />

          <path d="M1400 100 H1180 V190 H1080" opacity="0.42" className="tech-trace" />
          <path d="M1320 60 V150 H1240 V230" opacity="0.32" className="tech-trace" />
          <circle cx="1180" cy="100" r="3.5" fill="var(--blue-400)" stroke="none" opacity="0.5" />
          <circle cx="1080" cy="190" r="3" fill="var(--blue-600)" stroke="none" opacity="0.45" />

          <path d="M60 780 H220 V680 H340" opacity="0.4" className="tech-trace" />
          <path d="M120 840 V740 H200" opacity="0.3" className="tech-trace" />
          <circle cx="220" cy="780" r="3.5" fill="var(--blue-400)" stroke="none" opacity="0.5" />

          <path d="M1380 760 H1220 V660 H1100" opacity="0.38" className="tech-trace" />
          <path d="M1300 820 V720 H1180" opacity="0.28" className="tech-trace" />
          <circle cx="1220" cy="760" r="3.5" fill="var(--blue-400)" stroke="none" opacity="0.48" />

          <path d="M20 360 H90 V420 H150" opacity="0.28" className="tech-trace" />
          <path d="M1420 480 H1330 V540 H1260" opacity="0.26" className="tech-trace" />
        </g>
      </svg>

      {/* Floating 3D tech objects — sides / depth only */}
      <div className="tech-float-stage absolute inset-0">
        {FLOATS.map((item, i) => (
          <div
            key={i}
            className={cn(
              "tech-float absolute",
              !prefersReduced && "tech-float--live",
              item.className,
            )}
            style={
              {
                "--float-delay": item.delay,
                "--float-duration": item.duration,
                "--float-rotate": item.rotate,
              } as React.CSSProperties
            }
          >
            {item.kind === "keycap" && item.label ? <Keycap label={item.label} /> : null}
            {item.kind === "chip" ? <Chip /> : null}
            {item.kind === "bracket" && item.label ? <BracketGlyph label={item.label} /> : null}
            {item.kind === "cursor" ? <CursorGlyph /> : null}
          </div>
        ))}
      </div>

      {/* Depth wash */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] opacity-80"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--blue-600) 5%, transparent))",
        }}
      />

      {/* Strong center vignette — type always wins */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 74% 64% at 50% 38%, transparent 6%, color-mix(in srgb, var(--background) 48%, transparent) 52%, color-mix(in srgb, var(--background) 82%, transparent) 100%)",
        }}
      />
    </div>
  );
}

export const TechIconsField = SiteBackdrop;
