"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { Project } from "@/lib/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group glass rounded-2xl p-7 flex flex-col gap-5 hover:glow-border hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2 inline-block">
              Featured
            </span>
          )}
          <h3 className="font-display font-semibold text-xl">{project.title}</h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="text-fg-muted hover:text-accent transition-colors"
            >
              <Github size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-fg-muted hover:text-accent transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-fg-muted leading-relaxed">{project.summary}</p>

      <div className="space-y-3 pt-1 border-t border-border">
        <div className="pt-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint mb-1.5">Problem</p>
          <p className="text-sm text-fg-primary/90 leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint mb-1.5">Solution</p>
          <p className="text-sm text-fg-primary/90 leading-relaxed">{project.solution}</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint mb-1.5">Features</p>
          <ul className="text-sm text-fg-primary/90 space-y-1">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent">→</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-fg-muted border border-border"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
