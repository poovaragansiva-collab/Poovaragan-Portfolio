import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { GithubIcon } from "./icons";
import { ProjectMockup } from "./ProjectMockup";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const blocks = (p: Project) => [
  { title: "Problem", body: p.problem },
  { title: "Solution", body: p.solution },
  { title: "What I Learned", body: p.learned },
];

export function ProjectModal({ project, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 py-10 sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative w-full max-w-[860px] overflow-hidden rounded-3xl outline-none"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f5f5f5] backdrop-blur-md transition-colors hover:border-[#d4af37]/50 hover:text-[#f5d76e]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[82vh] overflow-y-auto p-5 sm:p-8">
              <p className="font-mono text-[10px] tracking-[0.26em] text-[#d4af37] uppercase">
                Project {project.index} · {project.year}
              </p>
              <h3
                id="project-modal-title"
                className="mt-3 text-[clamp(1.6rem,4.5vw,2.3rem)] leading-tight font-bold text-[#f5f5f5]"
              >
                {project.title}
              </h3>
              <p className="mt-1.5 text-[14px] text-[#a1a1a1]">{project.subtitle}</p>

              <div className="mt-6 group">
                <ProjectMockup project={project} />
              </div>

              <p className="mt-7 text-[15px] leading-[1.8] text-[#f5f5f5]/80">
                {project.summary}
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {blocks(project).map((b) => (
                  <div
                    key={b.title}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"
                  >
                    <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">
                      {b.title}
                    </h4>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-[#a1a1a1]">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">
                    Key Features
                  </h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[13.5px] leading-relaxed text-[#a1a1a1]">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#d4af37]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">
                    Technology
                  </h4>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-white/[0.09] bg-white/[0.035] px-2.5 py-1.5 font-mono text-[11px] text-[#f5f5f5]/80"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-white/[0.07] pt-6">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/[0.1] px-5 py-3 text-[13.5px] font-semibold text-[#f5d76e] transition-all hover:bg-[#d4af37]/[0.18]"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-[13.5px] font-semibold text-[#f5f5f5] transition-all hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    <GithubIcon className="h-4 w-4" /> View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
