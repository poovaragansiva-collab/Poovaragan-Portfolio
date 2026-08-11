import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import { cn } from "@/utils/cn";
import { GithubIcon } from "./icons";
import { ProjectMockup } from "./ProjectMockup";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-[#d4af37]/40 bg-[#d4af37]/[0.1] text-[#f5d76e]",
  "In Development": "border-white/12 bg-white/[0.04] text-[#f5f5f5]/75",
  Prototype: "border-white/10 bg-white/[0.03] text-[#a1a1a1]",
};

export function ProjectShowcase() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  return (
    <Section id="projects" label="Projects">
      <SectionHeading
        eyebrow="Selected Work"
        title={
          <>
            Projects are the <span className="gold-text">proof.</span>
          </>
        }
        description="Self-directed builds where the goal was a working product, not a submission. Open any project for the problem, the approach and what it taught me."
      />

      {/* filters */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap gap-2"
        >
          {projectFilters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-xl border px-4 py-2 text-[12.5px] font-medium transition-all duration-300",
                  active
                    ? "border-[#d4af37]/45 bg-[#d4af37]/[0.1] text-[#f5d76e]"
                    : "border-white/[0.08] bg-white/[0.02] text-[#a1a1a1] hover:border-white/20 hover:text-[#f5f5f5]",
                )}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-2 font-mono text-[10px] opacity-60">
                    {projects.filter((p) => p.categories.includes(f)).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* showcase */}
      <div className="mt-14 space-y-16 md:space-y-24">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={project.id}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.985 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* visual */}
                <div className={cn("relative", flip && "lg:order-2")}>
                  <button
                    onClick={() => setSelected(project)}
                    aria-label={`Open details for ${project.title}`}
                    className="block w-full rounded-2xl text-left"
                  >
                    <ProjectMockup project={project} />
                  </button>
                  <span className="absolute -top-4 -left-2 font-mono text-[54px] leading-none font-light text-white/[0.06] select-none sm:text-[68px] lg:-left-6">
                    {project.index}
                  </span>
                </div>

                {/* content */}
                <div className={cn(flip && "lg:order-1")}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 font-mono text-[9.5px] tracking-[0.16em] uppercase",
                        statusStyles[project.status],
                      )}
                    >
                      {project.status}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-[#a1a1a1]/70 uppercase">
                      {project.categories.join(" · ")}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[clamp(1.7rem,4.4vw,2.5rem)] leading-[1.08] font-bold tracking-tight text-[#f5f5f5]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[14px] font-medium text-[#d4af37]/90 sm:text-[15px]">
                    {project.subtitle}
                  </p>
                  <p className="mt-4 max-w-[540px] text-[14.5px] leading-[1.8] text-[#a1a1a1]">
                    {project.summary}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {project.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-[13.5px] leading-relaxed text-[#f5f5f5]/70"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#d4af37]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10.5px] text-[#f5f5f5]/70 transition-colors duration-300 group-hover:border-[#d4af37]/20"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/45 bg-[#d4af37]/[0.09] px-4.5 py-2.5 text-[13px] font-semibold text-[#f5d76e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/75 hover:shadow-[0_0_30px_-8px_rgba(212,175,55,0.6)]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.035] px-4.5 py-2.5 text-[13px] font-semibold text-[#f5f5f5] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.07]"
                      >
                        <GithubIcon className="h-3.5 w-3.5" /> GitHub
                      </a>
                    )}
                    <button
                      onClick={() => setSelected(project)}
                      className="group/btn inline-flex items-center gap-1.5 rounded-xl px-2 py-2.5 text-[13px] font-semibold text-[#a1a1a1] transition-colors hover:text-[#f5d76e]"
                    >
                      Case study
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="mt-14 text-center text-[14px] text-[#a1a1a1]">
          No projects in this category yet.
        </p>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
