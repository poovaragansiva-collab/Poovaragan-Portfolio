import { motion, useReducedMotion } from "framer-motion";
import {
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  LayoutTemplate,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

const groupIcons: Record<string, LucideIcon> = {
  languages: Code2,
  frontend: LayoutTemplate,
  backend: Database,
  ai: BrainCircuit,
  tools: Boxes,
};

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section id="skills" label="Skills">
      <SectionHeading
        eyebrow="Toolkit"
        title={
          <>
            The stack I <span className="gold-text">build with.</span>
          </>
        }
        description="No proficiency bars — just the technologies I actively use across the projects below, grouped by where they sit in a system."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = groupIcons[group.id] ?? Code2;
          const wide = group.id === "languages";
          return (
            <Reveal
              key={group.id}
              delay={gi * 0.07}
              className={wide ? "md:col-span-2" : undefined}
            >
              <div className="glass sheen group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-[#d4af37]/25 hover:shadow-[0_30px_70px_-40px_rgba(212,175,55,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/[0.07]">
                    <Icon className="h-4 w-4 text-[#d4af37]" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-[#f5f5f5]">
                      {group.title}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-[#a1a1a1]/75 uppercase">
                      {group.hint}
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-white/[0.07]" />

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: reduce ? 0.2 : 0.42,
                        delay: reduce ? 0 : i * 0.035 + gi * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="inline-flex cursor-default items-center rounded-lg border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[12.5px] font-medium text-[#f5f5f5]/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:bg-[#d4af37]/[0.09] hover:text-[#f5d76e]">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
