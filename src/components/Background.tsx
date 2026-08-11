import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  gold: boolean;
}

/**
 * Fixed ambient environment: faint grid, soft gold light pools,
 * a few floating glass particles and a noise layer.
 * Purely decorative — hidden from assistive tech.
 */
export function Background() {
  const reduce = useReducedMotion();

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 37 + 11) % 100,
        top: (i * 53 + 7) % 100,
        size: 1.5 + ((i * 7) % 4),
        duration: 16 + ((i * 5) % 14),
        delay: (i * 1.7) % 10,
        gold: i % 5 === 0,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.055),transparent_60%)]" />

      {/* faint grid with radial fade */}
      <div
        className="grid-faint absolute inset-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(100% 70% at 50% 20%, black 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(100% 70% at 50% 20%, black 0%, transparent 78%)",
        }}
      />

      {/* gold light pools */}
      <motion.div
        className="absolute -top-40 -left-24 h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.13), transparent 65%)" }}
        animate={reduce ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[45%] -right-40 h-[560px] w-[560px] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(245,215,110,0.085), transparent 65%)" }}
        animate={reduce ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[900px] max-w-[110vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035),transparent_65%)] blur-[120px]" />

      {/* floating glass particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.gold ? "rgba(245,215,110,0.55)" : "rgba(255,255,255,0.32)",
            boxShadow: p.gold
              ? "0 0 10px rgba(212,175,55,0.5)"
              : "0 0 8px rgba(255,255,255,0.18)",
          }}
          animate={
            reduce
              ? { opacity: 0.35 }
              : { y: [0, -60, 0], opacity: [0, 0.7, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* noise */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_50%,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
