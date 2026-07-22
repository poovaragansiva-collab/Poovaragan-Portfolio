"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt?: string;
  size?: "hero" | "about";
  className?: string;
};

export default function ProfilePhoto({ src, alt = "Poovaragan S", size = "hero", className }: Props) {
  const dimensions = size === "hero" ? "w-64 h-64 md:w-80 md:h-80" : "w-40 h-40 md:w-48 md:h-48";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className={cn("relative shrink-0", dimensions, className)}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" />

      {/* Glass frame */}
      <div className="relative h-full w-full rounded-3xl glass-strong overflow-hidden shadow-glow">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 256px, 320px"
            className="object-cover"
            priority={size === "hero"}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
            <User className="text-fg-faint" size={size === "hero" ? 64 : 40} strokeWidth={1} />
          </div>
        )}
        {/* Top edge highlight for glass effect */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
