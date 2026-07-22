"use client";

import { motion } from "framer-motion";
import { Server, Bot, PenTool, Wrench } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { expertiseCategories } from "@/lib/data/expertise";
import SectionWrapper from "@/components/layout/SectionWrapper";

const icons: Record<string, React.ElementType> = {
  backend: Server,
  "ai-automation": Bot,
  "technical-writing": PenTool,
  tools: Wrench,
};

export default function ExpertiseSection() {
  return (
    <SectionWrapper
      id="expertise"
      eyebrow="Expertise"
      title="What I bring to a build"
      description="Four disciplines that work together — backend systems, AI automation, technical communication, and the tools that hold it all together."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {expertiseCategories.map((cat) => {
          const Icon = icons[cat.id] ?? Server;
          return (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              className="glass rounded-2xl p-6 flex flex-col gap-4 hover:glow-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{cat.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{cat.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-fg-muted border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
