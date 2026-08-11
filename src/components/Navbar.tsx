import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-[1100px] items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
            scrolled
              ? "glass shadow-[0_20px_50px_-30px_rgba(0,0,0,1)]"
              : "border border-white/[0.06] bg-white/[0.015] backdrop-blur-[6px]",
          )}
        >
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 rounded-lg px-1.5 py-1"
            aria-label="Poovaragan S — back to top"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4af37]/35 bg-[#d4af37]/[0.07]">
              <span className="font-mono text-[13px] font-semibold text-[#f5d76e]">P</span>
            </span>
            <span className="hidden text-[13.5px] font-semibold tracking-tight text-[#f5f5f5] sm:block">
              Poovaragan<span className="text-[#d4af37]">.</span>
            </span>
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                      isActive
                        ? "text-[#f5f5f5]"
                        : "text-[#a1a1a1] hover:text-[#f5f5f5]",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg border border-[#d4af37]/25 bg-[#d4af37]/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="hidden rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/[0.08] px-4 py-2 text-[12.5px] font-semibold text-[#f5d76e] transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/[0.14] hover:shadow-[0_0_24px_-6px_rgba(212,175,55,0.5)] sm:block"
            >
              Hire Me
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#f5f5f5] transition-colors hover:border-[#d4af37]/40 md:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#050505]/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute inset-x-4 top-24 space-y-1 rounded-2xl p-3"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.35 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                      active === link.id
                        ? "bg-[#d4af37]/[0.09] text-[#f5d76e]"
                        : "text-[#f5f5f5]/85 hover:bg-white/[0.04]",
                    )}
                  >
                    {link.label}
                    <span className="font-mono text-[10px] text-[#a1a1a1]">
                      0{i + 1}
                    </span>
                  </button>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/[0.1] px-4 py-3.5 text-center text-[14px] font-semibold text-[#f5d76e]"
                >
                  Email Me
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
