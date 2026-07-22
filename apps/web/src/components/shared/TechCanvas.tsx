"use client";

import * as React from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Node = {
  id: string;
  label: string;
  group: "frontend" | "backend" | "produto" | "processos" | "core";
  x: number;
  y: number;
};

type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "core", label: "Software", group: "core", x: 0.5, y: 0.5 },
  { id: "fe1", label: "React", group: "frontend", x: 0.16, y: 0.22 },
  { id: "fe2", label: "Next.js", group: "frontend", x: 0.28, y: 0.72 },
  { id: "fe3", label: "TypeScript", group: "frontend", x: 0.08, y: 0.48 },
  { id: "be1", label: "Node", group: "backend", x: 0.84, y: 0.24 },
  { id: "be2", label: "APIs", group: "backend", x: 0.92, y: 0.52 },
  { id: "be3", label: "Postgres", group: "backend", x: 0.78, y: 0.78 },
  { id: "pd1", label: "Discovery", group: "produto", x: 0.36, y: 0.1 },
  { id: "pd2", label: "UX", group: "produto", x: 0.62, y: 0.08 },
  { id: "pc1", label: "Delivery", group: "processos", x: 0.42, y: 0.9 },
  { id: "pc2", label: "Qualidade", group: "processos", x: 0.66, y: 0.9 },
];

const EDGES: Edge[] = [
  { from: "core", to: "fe1" },
  { from: "core", to: "fe2" },
  { from: "core", to: "fe3" },
  { from: "core", to: "be1" },
  { from: "core", to: "be2" },
  { from: "core", to: "be3" },
  { from: "core", to: "pd1" },
  { from: "core", to: "pd2" },
  { from: "core", to: "pc1" },
  { from: "core", to: "pc2" },
  { from: "fe1", to: "fe2" },
  { from: "fe2", to: "fe3" },
  { from: "be1", to: "be2" },
  { from: "be2", to: "be3" },
  { from: "pd1", to: "pd2" },
  { from: "pc1", to: "pc2" },
];

const GROUP_COLORS: Record<Node["group"], string> = {
  core: "var(--navy-900)",
  frontend: "var(--blue-600)",
  backend: "var(--blue-700)",
  produto: "var(--blue-400)",
  processos: "var(--blue-300)",
};

const GROUP_LABEL: Record<Exclude<Node["group"], "core">, string> = {
  frontend: "Frontend",
  backend: "Backend",
  produto: "Produto",
  processos: "Processos",
};

const VB_W = 720;
const VB_H = 420;

export function TechCanvas({ className }: { className?: string }) {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [pointer, setPointer] = React.useState<{ x: number; y: number } | null>(null);
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    if (prefersReduced) setPointer(null);
  }, [prefersReduced]);

  const handleMove = React.useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (prefersReduced) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * VB_W;
      const y = ((event.clientY - rect.top) / rect.height) * VB_H;
      setPointer({ x, y });
    },
    [prefersReduced],
  );

  const handleLeave = React.useCallback(() => {
    setPointer(null);
    setHoveredNode(null);
  }, []);

  const nodePositions = React.useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const n of NODES) {
      const baseX = n.x * VB_W;
      const baseY = n.y * VB_H;
      if (!pointer || n.id === "core") {
        map.set(n.id, { x: baseX, y: baseY });
        continue;
      }
      const dx = baseX - pointer.x;
      const dy = baseY - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxRadius = 140;
      const strength = Math.max(0, 1 - dist / maxRadius);
      const shift = strength * 10;
      const angle = Math.atan2(dy, dx);
      map.set(n.id, {
        x: baseX + Math.cos(angle) * shift,
        y: baseY + Math.sin(angle) * shift,
      });
    }
    return map;
  }, [pointer]);

  return (
    <div
      className={cn(
        "relative aspect-[720/420] w-full overflow-hidden rounded-[20px] border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-white to-[color:rgb(128_203_243_/_0.14)] shadow-card",
        className,
      )}
      aria-label="Diagrama interativo das áreas de atuação"
      role="img"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <defs>
          <radialGradient id="tc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(33, 129, 189, 0.18)" />
            <stop offset="100%" stopColor="rgba(33, 129, 189, 0)" />
          </radialGradient>
          <pattern id="tc-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="rgba(220, 230, 238, 0.6)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width={VB_W} height={VB_H} fill="url(#tc-grid)" />
        <circle cx={VB_W / 2} cy={VB_H / 2} r={180} fill="url(#tc-glow)" />

        {EDGES.map((edge, i) => {
          const a = nodePositions.get(edge.from);
          const b = nodePositions.get(edge.to);
          if (!a || !b) return null;
          const isActive =
            hoveredNode && (hoveredNode === edge.from || hoveredNode === edge.to);
          return (
            <line
              key={`e-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isActive ? "var(--blue-600)" : "var(--blue-400)"}
              strokeOpacity={isActive ? 0.95 : 0.45}
              strokeWidth={isActive ? 1.6 : 1}
              className="transition-all duration-200 ease-out"
              style={{ transitionProperty: "stroke, stroke-opacity, stroke-width" }}
            />
          );
        })}

        {NODES.map((node) => {
          const pos = nodePositions.get(node.id)!;
          const isCore = node.id === "core";
          const isHovered = hoveredNode === node.id;
          const radius = isCore ? 28 : isHovered ? 12 : 9;
          return (
            <g
              key={node.id}
              transform={`translate(${pos.x} ${pos.y})`}
              className="cursor-default"
              onPointerEnter={() => setHoveredNode(node.id)}
              onPointerLeave={() => setHoveredNode((prev) => (prev === node.id ? null : prev))}
            >
              {isCore && (
                <circle
                  r={44}
                  fill="none"
                  stroke="var(--blue-400)"
                  strokeOpacity={0.35}
                  strokeDasharray="2 6"
                />
              )}
              <circle
                r={radius}
                fill={GROUP_COLORS[node.group]}
                className="transition-all duration-200 ease-out"
                style={{ transitionProperty: "r, fill-opacity" }}
                fillOpacity={isCore ? 1 : isHovered ? 1 : 0.9}
              />
              {isCore ? (
                <text
                  y={4}
                  textAnchor="middle"
                  className="fill-white"
                  style={{
                    fontFamily: "var(--font-mono, ui-monospace)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {node.label.toUpperCase()}
                </text>
              ) : (
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  className="fill-[var(--text-primary)]"
                  style={{
                    fontFamily: "var(--font-mono, ui-monospace)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
        {(Object.keys(GROUP_LABEL) as Array<keyof typeof GROUP_LABEL>).map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] backdrop-blur"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ background: GROUP_COLORS[k] }}
            />
            {GROUP_LABEL[k]}
          </span>
        ))}
      </div>
    </div>
  );
}
