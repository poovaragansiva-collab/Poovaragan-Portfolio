"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { Experiment } from "@/lib/data/experiments";

const statusStyles: Record<Experiment["status"], string> = {
  live: "text-success border-success/30 bg-success/10",
  prototype: "text-accent border-accent/30 bg-accent/10",
  research: "text-fg-muted border-border bg-white/5",
};

export default function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl p-6 flex flex-col gap-4 hover:glow-border hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
          <FlaskConical size={18} strokeWidth={1.75} />
        </div>
        <span
          className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusStyles[experiment.status]}`}
        >
          {experiment.status}
        </span>
      </div>

      <div>
        <h3 className="font-display font-semibold text-lg mb-1.5">{experiment.title}</h3>
        <p className="text-sm text-fg-muted leading-relaxed">{experiment.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {experiment.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-fg-muted border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
