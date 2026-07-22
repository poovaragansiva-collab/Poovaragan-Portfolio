"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { profile } from "@/lib/data/profile";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function ResumeSection() {
  return (
    <SectionWrapper id="resume" eyebrow="Resume" title="Full background, one download away">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="glass-strong rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-xl bg-accent-soft flex items-center justify-center text-accent shrink-0">
            <FileText size={24} strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">Poovaragan S — Resume</h3>
            <p className="text-sm text-fg-muted mt-1">
              Education, experience, and a detailed breakdown of technical skills.
            </p>
          </div>
        </div>

        <a
          href={profile.links.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium shadow-glow-sm hover:shadow-glow transition-all shrink-0"
        >
          <Download size={16} />
          Download PDF
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
