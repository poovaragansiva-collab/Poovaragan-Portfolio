"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { projects } from "@/lib/data/projects";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <SectionWrapper
      id="projects"
      eyebrow="Selected Work"
      title="Projects"
      description="A mix of backend systems, security tooling, and AI-powered products — each built to solve a real, specific problem."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
