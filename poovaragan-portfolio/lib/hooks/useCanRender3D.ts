"use client";

import { useEffect, useState } from "react";

/**
 * Returns whether it's appropriate to render the R3F canvas:
 * false on prefers-reduced-motion or narrow (mobile) viewports.
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.innerWidth < 768;
    setCanRender(!reducedMotion && !isNarrow);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setCanRender(!mq.matches && window.innerWidth >= 768);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return canRender;
}
