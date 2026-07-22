"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { profile } from "@/lib/data/profile";
import ProfilePhoto from "@/components/hero/ProfilePhoto";

const points = [
  { label: "What I build", text: profile.about.build },
  { label: "What I'm learning", text: profile.about.learning },
  { label: "Problems I solve", text: profile.about.solve },
  { label: "Where I'm headed", text: profile.about.vision },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.6fr_1fr] gap-14 items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col items-center lg:items-start gap-8 lg:sticky lg:top-32"
        >
          <ProfilePhoto size="about" />
          <div className="text-center lg:text-left">
            <p className="eyebrow mb-3">About</p>
            <h2 className="text-3xl md:text-4xl font-semibold">{profile.name}</h2>
            <p className="text-fg-muted mt-2 max-w-xs">{profile.intro}</p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 gap-6"
        >
          {points.map((p) => (
            <motion.div
              key={p.label}
              variants={fadeUp}
              className="glass rounded-2xl p-6 hover:glow-border transition-all duration-300"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">{p.label}</p>
              <p className="text-fg-primary leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
