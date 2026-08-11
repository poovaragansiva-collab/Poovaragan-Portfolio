import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/utils/cn";

interface ProfileImageProps {
  /** Path to the photo. Drop the file at `public/profile.jpg` — no code change needed. */
  src?: string;
  alt?: string;
  className?: string;
}

/**
 * Crystal-glass portrait frame.
 * Renders `src` when the file exists, otherwise falls back to an
 * elegant empty placeholder. No remote images, no stock photography.
 */
export function ProfileImage({
  src = "/profile.jpg",
  alt = "Portrait of Poovaragan S",
  className,
}: ProfileImageProps) {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const showImage = Boolean(src) && !failed;

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[420px]", className)}>
      {/* ambient gold glow */}
      <div
        aria-hidden
        className="absolute inset-[-14%] rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.18), rgba(212,175,55,0.05) 45%, transparent 70%)",
        }}
      />

      {/* orbital rings */}
      <motion.div
        aria-hidden
        className="absolute inset-[-6%] rounded-full border border-dashed border-white/10"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-1/2 -left-[5px] h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-[#f5d76e] shadow-[0_0_14px_rgba(212,175,55,0.9)]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-[2%] rounded-full border border-[#d4af37]/18"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
      </motion.div>

      {/* glass frame */}
      <div className="glass sheen absolute inset-[8%] overflow-hidden rounded-full">
        {/* inner gold hairline */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(212,175,55,0.35), inset 0 1px 22px rgba(255,255,255,0.10)",
          }}
        />

        {showImage ? (
          <img
            src={src}
            alt={alt}
            width={420}
            height={420}
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-full bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white/[0.04]">
              <User className="h-6 w-6 text-[#d4af37]" strokeWidth={1.4} aria-hidden />
            </span>
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#d4af37] uppercase">
              [ Your Photo ]
            </span>
            <span className="max-w-[190px] font-mono text-[10px] leading-relaxed tracking-[0.08em] text-[#a1a1a1]/70">
              add public/profile.jpg
            </span>
          </div>
        )}

        {/* top reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent)]"
        />
      </div>

      {/* floating caption chip */}
      <motion.div
        className="glass absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 sm:-bottom-1"
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] tracking-[0.22em] whitespace-nowrap text-[#f5f5f5]/80 uppercase">
          CSE <span className="text-[#d4af37]">•</span> Class of 2029
        </span>
      </motion.div>
    </div>
  );
}
