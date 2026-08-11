import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  label?: string;
}

export function Section({ id, children, className, label }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative mx-auto w-full max-w-[1200px] scroll-mt-28 px-5 py-20 sm:px-8 md:py-28 lg:px-10 lg:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/70" />
          <span className="font-mono text-[10.5px] tracking-[0.28em] text-[#d4af37] uppercase sm:text-[11px]">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-[clamp(1.9rem,5vw,3.1rem)] leading-[1.08] font-semibold text-balance text-[#f5f5f5]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-[15px] leading-relaxed text-[#a1a1a1] sm:text-base">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
