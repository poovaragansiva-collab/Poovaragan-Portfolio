"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { Service } from "@/lib/data/services";

export default function ServiceCard({
  service,
  onRequestQuote,
}: {
  service: Service;
  onRequestQuote: (service: Service) => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl p-7 flex flex-col gap-5 hover:glow-border hover:-translate-y-1 transition-all duration-300"
    >
      <div>
        <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
        <p className="text-sm text-fg-muted leading-relaxed">{service.description}</p>
      </div>

      <ul className="space-y-2 text-sm text-fg-primary/90">
        {service.deliverables.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="text-accent">→</span>
            {d}
          </li>
        ))}
      </ul>

      {/* Price slot — intentionally empty, ready for future pricing */}
      {service.price && (
        <p className="font-mono text-sm text-accent">{service.price}</p>
      )}

      <button
        onClick={() => onRequestQuote(service)}
        className="mt-auto group inline-flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-all"
      >
        Request a Quote
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </motion.div>
  );
}
