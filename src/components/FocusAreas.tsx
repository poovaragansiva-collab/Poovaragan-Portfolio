import { motion, useReducedMotion } from "framer-motion";
import { focusAreas } from "@/data/site";
import { Reveal } from "./ui/Reveal";

export function FocusAreas() {
  const reduce = useReducedMotion();

  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/70" />
              <span className="font-mono text-[10.5px] tracking-[0.28em] text-[#d4af37] uppercase">
                Focus
              </span>
            </div>
            <h3 className="mt-4 text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-tight text-[#f5f5f5]">
              Currently Exploring
            </h3>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#a1a1a1]">
            Five directions shaping what I build and what I read this year.
          </p>
        </div>
      </Reveal>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area, i) => (
          <motion.li
            key={area.no}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduce ? 0.25 : 0.6,
              delay: reduce ? 0 : i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={
              i === 4 ? "sm:col-span-2 lg:col-span-1" : undefined
            }
          >
            <article className="glass sheen group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/28 hover:shadow-[0_28px_60px_-34px_rgba(212,175,55,0.45)]">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[26px] leading-none font-light text-white/12 transition-colors duration-500 group-hover:text-[#d4af37]/45">
                  {area.no}
                </span>
                <span className="mt-1 h-px w-8 bg-white/12 transition-all duration-500 group-hover:w-12 group-hover:bg-[#d4af37]/60" />
              </div>
              <h4 className="mt-5 text-[17px] font-semibold tracking-tight text-[#f5f5f5]">
                {area.title}
              </h4>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#a1a1a1]">
                {area.body}
              </p>
            </article>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
