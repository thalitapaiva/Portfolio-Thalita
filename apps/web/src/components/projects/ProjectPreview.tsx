import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ProjectPreviewProps {
  title: string;
  slug?: string;
  className?: string;
}

type ThemeKey =
  | "batman"
  | "clocks"
  | "weather"
  | "amigo"
  | "velha"
  | "projectgram"
  | "code";

function resolveTheme(slug?: string, title?: string): ThemeKey {
  const key = `${slug ?? ""} ${title ?? ""}`.toLowerCase();
  if (/batman|hero|comic/.test(key)) return "batman";
  if (/clock|relogio|relógio|time|hora/.test(key)) return "clocks";
  if (/weather|clima|tempo|forecast|sky/.test(key)) return "weather";
  if (/amigo|secreto|gift|sorte|party|presente/.test(key)) return "amigo";
  if (/velha|tic-?tac|tictactoe/.test(key)) return "velha";
  if (/gram|social|feed|insta/.test(key)) return "projectgram";
  return "code";
}

function hashHue(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return 195 + (h % 35); // blue family
}

function BatmanArt() {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="batSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0e18" />
          <stop offset="55%" stopColor="#121a2e" />
          <stop offset="100%" stopColor="#1a2744" />
        </linearGradient>
        <radialGradient id="batGlow" cx="50%" cy="35%" r="45%">
          <stop offset="0%" stopColor="#2181bd" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2181bd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill="url(#batSky)" />
      <rect width="640" height="400" fill="url(#batGlow)" />
      {/* city skyline */}
      <g fill="#070b14" opacity="0.92">
        <rect x="40" y="220" width="48" height="180" />
        <rect x="100" y="180" width="36" height="220" />
        <rect x="148" y="240" width="56" height="160" />
        <rect x="220" y="160" width="44" height="240" />
        <rect x="280" y="210" width="70" height="190" />
        <rect x="370" y="150" width="50" height="250" />
        <rect x="440" y="200" width="60" height="200" />
        <rect x="520" y="170" width="42" height="230" />
        <rect x="575" y="230" width="45" height="170" />
      </g>
      {/* window lights */}
      <g fill="#80cbf3" opacity="0.45">
        {[110, 115, 230, 235, 385, 390, 450, 530].map((x, i) => (
          <rect key={i} x={x} y={200 + (i % 3) * 28} width="6" height="10" rx="1" />
        ))}
      </g>
      {/* bat emblem */}
      <g transform="translate(320 155)" fill="#eef3f8" opacity="0.88">
        <path d="M0-48 C18-28 38-22 56-18 C40-8 28 6 22 28 C12 12 6 8 0 18 C-6 8 -12 12 -22 28 C-28 6 -40-8 -56-18 C-38-22 -18-28 0-48Z" />
        <path d="M-18-36 L-8-52 L0-40 L8-52 L18-36" fill="none" stroke="#eef3f8" strokeWidth="3" />
      </g>
      <circle cx="520" cy="70" r="28" fill="#6dadd8" opacity="0.2" />
      <circle cx="520" cy="70" r="18" fill="#80cbf3" opacity="0.35" />
    </svg>
  );
}

function ClocksArt() {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="clkBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#142033" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#clkBg)" />
      <circle cx="320" cy="200" r="118" fill="none" stroke="#80cbf3" strokeWidth="3" opacity="0.55" />
      <circle cx="320" cy="200" r="102" fill="#0e1522" opacity="0.7" />
      <circle cx="320" cy="200" r="96" fill="none" stroke="#6dadd8" strokeWidth="1.5" opacity="0.4" />
      {/* ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const x1 = 320 + Math.cos(a) * 82;
        const y1 = 200 + Math.sin(a) * 82;
        const x2 = 320 + Math.cos(a) * 92;
        const y2 = 200 + Math.sin(a) * 92;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#80cbf3"
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
            opacity="0.7"
          />
        );
      })}
      {/* hands ~10:10 */}
      <line x1="320" y1="200" x2="320" y2="130" stroke="#eef3f8" strokeWidth="4" strokeLinecap="round" />
      <line x1="320" y1="200" x2="375" y2="170" stroke="#2181bd" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="320" cy="200" r="6" fill="#80cbf3" />
      {/* digital strip */}
      <rect x="220" y="330" width="200" height="36" rx="8" fill="#070b14" opacity="0.65" />
      <text
        x="320"
        y="354"
        textAnchor="middle"
        fill="#80cbf3"
        fontFamily="ui-monospace, monospace"
        fontSize="18"
        fontWeight="600"
      >
        10:10:42
      </text>
    </svg>
  );
}

function WeatherArt() {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="wxSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3c678e" />
          <stop offset="45%" stopColor="#6dadd8" />
          <stop offset="100%" stopColor="#cfe9f8" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#wxSky)" />
      <circle cx="480" cy="110" r="52" fill="#80cbf3" opacity="0.95" />
      <circle cx="480" cy="110" r="68" fill="#80cbf3" opacity="0.22" />
      {/* clouds */}
      <g fill="#ffffff" opacity="0.88">
        <ellipse cx="180" cy="150" rx="70" ry="36" />
        <ellipse cx="230" cy="140" rx="50" ry="30" />
        <ellipse cx="140" cy="155" rx="42" ry="26" />
        <ellipse cx="360" cy="200" rx="80" ry="38" />
        <ellipse cx="410" cy="190" rx="48" ry="28" />
        <ellipse cx="310" cy="205" rx="44" ry="24" />
      </g>
      {/* rain accents */}
      <g stroke="#2181bd" strokeWidth="2.5" strokeLinecap="round" opacity="0.45">
        <line x1="150" y1="210" x2="140" y2="240" />
        <line x1="180" y1="215" x2="170" y2="248" />
        <line x1="210" y1="208" x2="200" y2="242" />
      </g>
      {/* temp badge */}
      <rect x="48" y="280" width="150" height="72" rx="16" fill="#142033" opacity="0.55" />
      <text x="72" y="328" fill="#eef3f8" fontFamily="system-ui,sans-serif" fontSize="36" fontWeight="700">
        24°
      </text>
      <text x="140" y="328" fill="#80cbf3" fontFamily="system-ui,sans-serif" fontSize="14" fontWeight="600">
        Céu limpo
      </text>
    </svg>
  );
}

function AmigoArt() {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="giftBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3350" />
          <stop offset="100%" stopColor="#2181bd" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#giftBg)" />
      {/* confetti */}
      {[
        [80, 60],
        [140, 100],
        [500, 70],
        [560, 120],
        [90, 300],
        [540, 280],
        [200, 50],
        [420, 40],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="10"
          height="10"
          rx="2"
          fill={i % 2 === 0 ? "#80cbf3" : "#eef3f8"}
          opacity="0.55"
          transform={`rotate(${i * 18} ${x} ${y})`}
        />
      ))}
      {/* gift box */}
      <g transform="translate(220 120)">
        <rect x="20" y="80" width="180" height="140" rx="8" fill="#0e1522" opacity="0.75" />
        <rect x="20" y="80" width="180" height="140" rx="8" fill="#142033" opacity="0.4" />
        <rect x="95" y="80" width="30" height="140" fill="#80cbf3" opacity="0.85" />
        <rect x="20" y="130" width="180" height="28" fill="#80cbf3" opacity="0.85" />
        {/* lid */}
        <rect x="8" y="55" width="204" height="36" rx="6" fill="#1e3a5f" />
        <rect x="98" y="55" width="24" height="36" fill="#cfe9f8" opacity="0.9" />
        {/* bow */}
        <path d="M110 55 C80 20 50 40 70 60 C90 70 100 55 110 55Z" fill="#eef3f8" opacity="0.9" />
        <path d="M110 55 C140 20 170 40 150 60 C130 70 120 55 110 55Z" fill="#eef3f8" opacity="0.9" />
        <circle cx="110" cy="58" r="10" fill="#80cbf3" />
      </g>
    </svg>
  );
}

function VelhaArt() {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="tttBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e1522" />
          <stop offset="100%" stopColor="#1a3350" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#tttBg)" />
      <g transform="translate(170 50)">
        {/* grid */}
        <line x1="100" y1="10" x2="100" y2="290" stroke="#6dadd8" strokeWidth="6" opacity="0.55" />
        <line x1="200" y1="10" x2="200" y2="290" stroke="#6dadd8" strokeWidth="6" opacity="0.55" />
        <line x1="10" y1="100" x2="290" y2="100" stroke="#6dadd8" strokeWidth="6" opacity="0.55" />
        <line x1="10" y1="200" x2="290" y2="200" stroke="#6dadd8" strokeWidth="6" opacity="0.55" />
        {/* X */}
        <g stroke="#80cbf3" strokeWidth="10" strokeLinecap="round">
          <line x1="30" y1="30" x2="70" y2="70" />
          <line x1="70" y1="30" x2="30" y2="70" />
          <line x1="230" y1="130" x2="270" y2="170" />
          <line x1="270" y1="130" x2="230" y2="170" />
          <line x1="130" y1="230" x2="170" y2="270" />
          <line x1="170" y1="230" x2="130" y2="270" />
        </g>
        {/* O */}
        <circle cx="150" cy="50" r="28" fill="none" stroke="#2181bd" strokeWidth="10" />
        <circle cx="50" cy="150" r="28" fill="none" stroke="#2181bd" strokeWidth="10" />
        <circle cx="250" cy="250" r="28" fill="none" stroke="#2181bd" strokeWidth="10" />
      </g>
    </svg>
  );
}

function ProjectgramArt() {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pgBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0f6fb" />
          <stop offset="100%" stopColor="#d4e8f6" />
        </linearGradient>
        <linearGradient id="pgPost" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2181bd" />
          <stop offset="100%" stopColor="#80cbf3" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#pgBg)" />
      {/* phone frame */}
      <rect x="190" y="28" width="260" height="344" rx="28" fill="#142033" />
      <rect x="202" y="48" width="236" height="300" rx="16" fill="#eef3f8" />
      {/* status / avatar row */}
      <circle cx="230" cy="78" r="14" fill="#6dadd8" />
      <rect x="252" y="70" width="90" height="8" rx="4" fill="#3c678e" opacity="0.35" />
      <rect x="252" y="84" width="56" height="6" rx="3" fill="#3c678e" opacity="0.22" />
      {/* feed image */}
      <rect x="214" y="108" width="212" height="160" rx="8" fill="url(#pgPost)" />
      <circle cx="280" cy="170" r="28" fill="#ffffff" opacity="0.35" />
      <circle cx="320" cy="200" r="40" fill="#ffffff" opacity="0.2" />
      {/* action dots */}
      <circle cx="228" cy="290" r="7" fill="#2181bd" />
      <circle cx="252" cy="290" r="7" fill="#6dadd8" />
      <circle cx="276" cy="290" r="7" fill="#80cbf3" />
      <rect x="214" y="312" width="140" height="8" rx="4" fill="#3c678e" opacity="0.3" />
      <rect x="214" y="328" width="100" height="6" rx="3" fill="#3c678e" opacity="0.18" />
    </svg>
  );
}

function CodeArt({ seed }: { seed: string }) {
  const hue = hashHue(seed);
  const lines = [
    "const app = create()",
    "await db.connect()",
    "export default fn",
    "git push origin main",
    "pnpm build && deploy",
  ];
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="codeBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 42% 14%)`} />
          <stop offset="100%" stopColor={`hsl(${hue + 18} 48% 22%)`} />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#codeBg)" />
      {/* abstract window chrome without fake browser clutter — just code pane */}
      <rect x="48" y="48" width="544" height="304" rx="14" fill="#070b14" opacity="0.72" />
      <g fontFamily="ui-monospace, monospace" fontSize="16">
        {lines.map((line, i) => (
          <text key={line} x="80" y={110 + i * 42} fill="#80cbf3" opacity={0.55 + i * 0.08}>
            <tspan fill="#3c678e">{String(i + 1).padStart(2, "0")}</tspan>
            <tspan dx="18" fill={i % 2 === 0 ? "#80cbf3" : "#6dadd8"}>
              {line}
            </tspan>
          </text>
        ))}
      </g>
      <rect x="80" y="320" width="180" height="8" rx="4" fill="#2181bd" opacity="0.45" />
      <circle cx="560" cy="80" r="36" fill={`hsl(${hue} 70% 55%)`} opacity="0.25" />
    </svg>
  );
}

const ART: Record<ThemeKey, (seed: string) => ReactNode> = {
  batman: () => <BatmanArt />,
  clocks: () => <ClocksArt />,
  weather: () => <WeatherArt />,
  amigo: () => <AmigoArt />,
  velha: () => <VelhaArt />,
  projectgram: () => <ProjectgramArt />,
  code: (seed) => <CodeArt seed={seed} />,
};

/** Thematic cover illustration — unique per project, not a generic window mock. */
export function ProjectPreview({ title, slug, className }: ProjectPreviewProps) {
  const theme = resolveTheme(slug, title);
  const seed = slug || title;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-[var(--navy-900)]", className)}
      aria-hidden="true"
    >
      {ART[theme](seed)}
    </div>
  );
}
