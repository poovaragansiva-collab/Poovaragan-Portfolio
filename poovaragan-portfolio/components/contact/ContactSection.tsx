"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { profile } from "@/lib/data/profile";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ContactForm from "./ContactForm";

const channels = [
  { icon: Mail, label: "Email", value: profile.links.email, href: `mailto:${profile.links.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: profile.links.linkedin },
  { icon: Github, label: "GitHub", value: "View repositories", href: profile.links.github },
];

export default function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Whether it's a project, a role, or just a technical question — I read every message."
    >
      <div className="grid lg:grid-cols-[0.8fr_1fr] gap-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-4"
        >
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:glow-border transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent shrink-0">
                <c.icon size={18} />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-fg-faint">{c.label}</p>
                <p className="text-sm text-fg-primary">{c.value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <ContactForm />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
