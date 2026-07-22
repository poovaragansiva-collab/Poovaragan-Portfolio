"use client";

import { motion } from "framer-motion";
import { FileText, Linkedin, BookOpen, ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { WritingSample } from "@/lib/data/writing";

const typeIcons = {
  article: FileText,
  linkedin: Linkedin,
  documentation: BookOpen,
};

const typeLabels = {
  article: "Article",
  linkedin: "LinkedIn",
  documentation: "Documentation",
};

export default function ArticleCard({ sample }: { sample: WritingSample }) {
  const Icon = typeIcons[sample.type];

  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl p-6 flex flex-col gap-4 hover:glow-border hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
          {typeLabels[sample.type]}
        </span>
      </div>

      <div>
        <h3 className="font-display font-semibold text-lg mb-1.5 leading-snug">{sample.title}</h3>
        <p className="text-sm text-fg-muted leading-relaxed">{sample.excerpt}</p>
      </div>

      <div className="mt-auto pt-2">
        {sample.placeholder ? (
          <span className="text-xs text-fg-faint font-mono italic">Coming soon</span>
        ) : (
          <a
            href={sample.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:gap-2.5 transition-all"
          >
            Read piece <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
