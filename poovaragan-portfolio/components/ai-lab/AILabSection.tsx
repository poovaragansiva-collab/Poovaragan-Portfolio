"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { experiments } from "@/lib/data/experiments";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ExperimentCard from "./ExperimentCard";

export default function AILabSection() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute left-1/4 top-1/3 w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <SectionWrapper
        id="ai-lab"
        eyebrow="AI Lab"
        title="Experiments & Innovation"
        description="A live showcase of AI experiments, prototypes, and automation systems — where new ideas get tested before they become products."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
