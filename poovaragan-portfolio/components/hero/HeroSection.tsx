"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { profile } from "@/lib/data/profile";
import ProfilePhoto from "./ProfilePhoto";
import { useCanRender3D } from "@/lib/hooks/useCanRender3D";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroSection() {
  const canRender3D = useCanRender3D();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-10 lg:px-16 pt-32 pb-20">
      {/* 3D or static ambient background */}
      <div className="absolute inset-0 -z-10">
        {canRender3D ? (
          <HeroScene />
        ) : (
          <div
            className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-[1200px] mx-auto w-full grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center"
      >
        <div className="order-2 lg:order-1">
          <motion.p variants={fadeUp} className="eyebrow mb-6 flex items-center gap-2">
            <Sparkles size={14} /> {profile.availability.label}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold leading-[1.08] text-gradient mb-6"
          >
            {profile.headline}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-fg-muted max-w-xl mb-10">
            {profile.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-glow-sm hover:shadow-glow transition-all"
            >
              View Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass hover:glow-border rounded-full px-6 py-3.5 text-sm font-medium transition-all"
            >
              Work With Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-14 flex items-center gap-8 font-mono text-xs text-fg-faint">
            <span>AI AUTOMATION</span>
            <span className="h-1 w-1 rounded-full bg-fg-faint" />
            <span>BACKEND SYSTEMS</span>
            <span className="h-1 w-1 rounded-full bg-fg-faint" />
            <span className="hidden sm:inline">TECHNICAL WRITING</span>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <ProfilePhoto size="hero" />
        </motion.div>
      </motion.div>
    </section>
  );
}
