"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong py-3" : "bg-transparent py-6"
      )}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 lg:px-16">
        <a href="#" className="font-display text-lg font-semibold tracking-tight">
          Poovaragan<span className="text-accent">.</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted hover:text-fg-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs font-mono text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
            {profile.availability.label}
          </span>
          <a
            href="#contact"
            className="glass hover:glow-border rounded-full px-5 py-2 text-sm font-medium transition-all"
          >
            Work With Me
          </a>
        </div>

        <button
          className="lg:hidden text-fg-primary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass-strong mt-4 mx-4 rounded-2xl p-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base text-fg-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center rounded-full bg-accent py-3 text-sm font-medium"
          >
            Work With Me
          </a>
        </motion.div>
      )}
    </header>
  );
}
