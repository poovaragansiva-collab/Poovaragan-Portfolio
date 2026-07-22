"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({ id, eyebrow, title, description, children, className }: Props) {
  return (
    <section id={id} className={cn("section-padding", className)} aria-label={title}>
      <div className="max-w-[1200px] mx-auto">
        {(eyebrow || title) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-12 md:mb-16 max-w-2xl"
          >
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2>}
            {description && <p className="text-fg-muted text-base md:text-lg">{description}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
