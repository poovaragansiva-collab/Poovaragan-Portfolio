"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Zap } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import SectionWrapper from "@/components/layout/SectionWrapper";

const examples = [
  "Tell me about Poovaragan",
  "Explain his projects",
  "What services does he provide?",
  "What technologies does he use?",
  "Is he available for freelance work?",
  "Show me his writing samples",
];

const capabilities = [
  {
    icon: MessageSquare,
    title: "Ask anything about my work",
    text: "It knows my projects, services, AI Lab experiments, and writing — and answers in real time, not from a static FAQ.",
  },
  {
    icon: Zap,
    title: "Instant, accurate answers",
    text: "No digging through pages. Ask a direct question and get a direct, grounded answer.",
  },
  {
    icon: Bot,
    title: "A real path to working together",
    text: "If you're exploring hiring me, it collects your project details so I can follow up personally.",
  },
];

export default function AIAssistantSection() {
  return (
    <SectionWrapper
      id="ai-assistant"
      eyebrow="Meet the Assistant"
      title="An AI assistant trained on this entire portfolio"
      description="Instead of digging through sections, just ask. It's available in the corner of every page."
    >
      <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-5"
        >
          {capabilities.map((c) => (
            <motion.div key={c.title} variants={fadeUp} className="flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-accent-soft flex items-center justify-center text-accent">
                <c.icon size={20} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base mb-1">{c.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{c.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass-strong rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
            <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Portfolio Assistant</p>
              <p className="text-xs text-success flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
              </p>
            </div>
          </div>

          <p className="text-xs font-mono uppercase tracking-wider text-fg-faint mb-3">Try asking</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <span
                key={ex}
                className="text-sm px-3.5 py-2 rounded-full bg-white/5 border border-border text-fg-primary/90"
              >
                {ex}
              </span>
            ))}
          </div>

          <p className="text-xs text-fg-faint mt-6">
            Look for the chat icon in the bottom-right corner — it's available on every page.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
