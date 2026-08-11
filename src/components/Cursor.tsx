import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='tab'], input, textarea, select, [data-cursor]";

/** Subtle gold dot + trailing glow. Desktop / fine-pointer only. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.5 });
  const glowY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setActive(Boolean(target?.closest(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-[#f5d76e]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 9 : 6,
          height: active ? 9 : 6,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute top-0 left-0 rounded-full border"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          opacity: visible ? (active ? 0.9 : 0.4) : 0,
          borderColor: active ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.18)",
          backgroundColor: active ? "rgba(212,175,55,0.07)" : "rgba(255,255,255,0.02)",
        }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}
