import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { ProfileImage } from "./ProfileImage";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.8, delay: reduce ? 0 : delay, ease },
  });

  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col justify-center px-5 pt-28 pb-16 sm:px-8 lg:px-10 lg:pt-32"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* ---------- LEFT ---------- */}
        <div className="order-2 lg:order-1">
          <motion.div
            {...fade(0.15)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f5d76e]" />
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.24em] text-[#a1a1a1] uppercase sm:text-[10.5px]">
              {site.eyebrow}
            </span>
          </motion.div>

          <h1 className="mt-7 text-[clamp(2.4rem,8.2vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.035em] text-[#f5f5f5]">
            {site.headline.map((line, i) => (
              <motion.span key={line} className="block" {...fade(0.28 + i * 0.1)}>
                {i === 1 ? (
                  <span className="gold-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...fade(0.52)}
            className="mt-5 flex items-center gap-3 font-mono text-[12px] tracking-[0.16em] text-[#f5f5f5]/70 uppercase sm:text-[13px]"
          >
            <span className="h-px w-7 bg-[#d4af37]/60" />
            {site.role}
          </motion.p>

          <motion.p
            {...fade(0.6)}
            className="mt-6 max-w-[540px] text-[15px] leading-[1.75] text-[#a1a1a1] sm:text-[16.5px]"
          >
            {site.description}
          </motion.p>

          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group relative overflow-hidden rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/[0.1] px-6 py-3.5 text-[14px] font-semibold text-[#f5d76e] transition-all duration-300 hover:border-[#d4af37]/80 hover:bg-[#d4af37]/[0.16] hover:shadow-[0_0_36px_-8px_rgba(212,175,55,0.6)] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="group rounded-xl border border-white/12 bg-white/[0.035] px-6 py-3.5 text-[14px] font-semibold text-[#f5f5f5] backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#d4af37]" />
                Let's Connect
              </span>
            </button>
          </motion.div>

          <motion.div
            {...fade(0.82)}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/18 bg-[#d4af37]/[0.045] px-4 py-2"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#f5d76e]"
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: [1, 0.35, 1],
                      boxShadow: [
                        "0 0 0px rgba(245,215,110,0.9)",
                        "0 0 12px rgba(245,215,110,0.9)",
                        "0 0 0px rgba(245,215,110,0.9)",
                      ],
                    }
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[12px] font-medium text-[#f5f5f5]/75 sm:text-[13px]">
              {site.availability}
            </span>
          </motion.div>
        </div>

        {/* ---------- RIGHT ---------- */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0.3 : 1.1, delay: 0.35, ease }}
          className="order-1 w-full lg:order-2"
        >
          <ProfileImage src={site.photo} className="max-w-[260px] sm:max-w-[330px] lg:max-w-[400px]" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mx-auto mt-14 hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] tracking-[0.24em] text-[#a1a1a1] uppercase transition-colors hover:text-[#d4af37] lg:flex"
        aria-label="Scroll to about section"
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
