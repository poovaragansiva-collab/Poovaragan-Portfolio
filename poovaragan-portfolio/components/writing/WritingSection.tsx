"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { writingSamples } from "@/lib/data/writing";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ArticleCard from "./ArticleCard";

export default function WritingSection() {
  return (
    <SectionWrapper
      id="writing"
      eyebrow="Technical Writing"
      title="Words that explain systems clearly"
      description="Articles, documentation, and LinkedIn content — written to make technical ideas accessible without losing precision."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {writingSamples.map((sample) => (
          <ArticleCard key={sample.slug} sample={sample} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
