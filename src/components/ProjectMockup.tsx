import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";

const bars = [72, 46, 88, 34, 62, 51, 79, 40];

function MapArt() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080808]">
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0e0e0e" />
            <stop offset="100%" stopColor="#060606" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#ocean)" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={`c${i}`}
            d={`M -20 ${18 + i * 30} Q 100 ${i * 30}, 200 ${24 + i * 30} T 420 ${12 + i * 30}`}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}
        <path
          d="M60 190 Q110 140 170 165 T280 130 L320 160 L300 210 L120 220 Z"
          fill="rgba(212,175,55,0.06)"
          stroke="rgba(212,175,55,0.35)"
          strokeWidth="1"
        />
        <path
          d="M40 60 Q90 30 150 55 T250 40"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        {[
          [130, 95],
          [245, 150],
          [310, 78],
          [180, 195],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="16" fill="rgba(212,175,55,0.07)" />
            <circle cx={x} cy={y} r="3.5" fill="#f5d76e" />
          </g>
        ))}
      </svg>
      <div className="absolute top-4 left-4 rounded-lg border border-white/10 bg-black/45 px-2.5 py-1.5 backdrop-blur-md">
        <p className="font-mono text-[8.5px] tracking-[0.18em] text-[#d4af37] uppercase">
          Live monitoring
        </p>
      </div>
      <div className="absolute right-4 bottom-4 rounded-lg border border-white/10 bg-black/45 px-2.5 py-1.5 backdrop-blur-md">
        <p className="font-mono text-[8.5px] text-[#a1a1a1]">4 active zones</p>
      </div>
    </div>
  );
}

function DashboardArt() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080808] p-4">
      <div className="flex h-full gap-3">
        <div className="hidden w-[58px] shrink-0 flex-col gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2 sm:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full ${i === 1 ? "bg-[#d4af37]/70" : "bg-white/10"}`}
              style={{ width: `${60 + ((i * 13) % 40)}%` }}
            />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {["Orders", "Due", "Loyalty"].map((t, i) => (
              <div
                key={t}
                className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-2.5"
              >
                <p className="font-mono text-[7.5px] tracking-[0.16em] text-[#a1a1a1] uppercase">
                  {t}
                </p>
                <div
                  className={`mt-2 h-2 rounded-full ${i === 0 ? "bg-[#d4af37]/60" : "bg-white/15"}`}
                  style={{ width: `${45 + i * 18}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${i === 2 ? "bg-[#d4af37]/65" : "bg-white/[0.12]"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/70" />
                <span className="h-1.5 flex-1 rounded-full bg-white/10" />
                <span className="h-1.5 w-8 rounded-full bg-white/[0.07]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalArt() {
  const lines = [
    { p: "$", t: "organize ~/Downloads --apply", gold: true },
    { p: ">", t: "scanning 1,284 files" },
    { p: ">", t: "images → /Images   (312)" },
    { p: ">", t: "documents → /Docs  (486)" },
    { p: ">", t: "archives → /Archive (97)" },
    { p: "✓", t: "workspace organized", gold: true },
  ];
  return (
    <div className="h-full w-full bg-[#070707] p-5 font-mono">
      <div className="mb-4 flex gap-1.5">
        {["#d4af37", "rgba(255,255,255,0.18)", "rgba(255,255,255,0.10)"].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="space-y-2">
        {lines.map((l, i) => (
          <p
            key={i}
            className={`text-[10.5px] leading-relaxed ${l.gold ? "text-[#f5d76e]" : "text-[#a1a1a1]"}`}
          >
            <span className="mr-2 text-[#d4af37]/60">{l.p}</span>
            {l.t}
          </p>
        ))}
        <span className="inline-block h-3 w-1.5 animate-pulse bg-[#d4af37]/80 align-middle" />
      </div>
    </div>
  );
}

function VisionArt() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080808]">
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <rect width="400" height="260" fill="#080808" />
        <path
          d="M200 40 C 120 70, 95 150, 150 205 C 210 235, 285 190, 288 120 C 289 78, 250 48, 200 40 Z"
          fill="rgba(255,255,255,0.035)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.2"
        />
        <path
          d="M205 48 C 190 100, 175 160, 155 200"
          stroke="rgba(212,175,55,0.5)"
          strokeWidth="1.2"
          fill="none"
        />
        {[
          "M198 70 L 235 88",
          "M190 100 L 240 118",
          "M180 132 L 245 148",
          "M170 165 L 230 178",
          "M198 72 L 160 92",
          "M188 104 L 150 124",
          "M178 138 L 145 158",
        ].map((d, i) => (
          <path key={i} d={d} stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none" />
        ))}
        <rect
          x="150"
          y="95"
          width="90"
          height="72"
          fill="none"
          stroke="rgba(245,215,110,0.75)"
          strokeWidth="1.3"
          strokeDasharray="10 6"
          rx="4"
        />
      </svg>
      <div className="absolute top-4 left-4 rounded-lg border border-[#d4af37]/25 bg-black/50 px-2.5 py-1.5 backdrop-blur-md">
        <p className="font-mono text-[8.5px] tracking-[0.14em] text-[#f5d76e] uppercase">
          Classification
        </p>
      </div>
      <div className="absolute bottom-4 left-4 space-y-1.5">
        {[
          ["Leaf region detected", 1],
          ["Feature extraction", 0.6],
          ["Prediction ready", 0.35],
        ].map(([t, w]) => (
          <div key={String(t)} className="flex items-center gap-2">
            <span
              className="h-1 rounded-full bg-[#d4af37]/50"
              style={{ width: `${Number(w) * 90}px` }}
            />
            <span className="font-mono text-[8px] text-[#a1a1a1]">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const artMap = {
  map: MapArt,
  dashboard: DashboardArt,
  terminal: TerminalArt,
  vision: VisionArt,
};

export function ProjectMockup({ project }: { project: Project }) {
  const Art = artMap[project.mockup];
  const reduce = useReducedMotion();

  return (
    <div className="glass sheen group/mock relative aspect-[16/11] w-full overflow-hidden rounded-2xl p-2 transition-all duration-500 group-hover:border-[#d4af37]/30">
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.07]">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.025] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <div className="ml-2 flex-1 truncate rounded-md bg-black/40 px-2.5 py-1 font-mono text-[8.5px] text-[#a1a1a1]">
            {project.demo ?? `${project.id}.local`}
          </div>
        </div>
        <motion.div
          className="h-[calc(100%-29px)] w-full"
          whileHover={reduce ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Art />
        </motion.div>
      </div>

      {/* moving reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.07) 48%, rgba(245,215,110,0.06) 52%, transparent 66%)",
        }}
      />
    </div>
  );
}
