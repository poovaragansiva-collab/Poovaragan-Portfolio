import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { About } from "@/components/About";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { GitHubSection } from "@/components/GitHubSection";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Navbar } from "@/components/Navbar";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Skills } from "@/components/Skills";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37] to-[#f5d76e]"
    />
  );
}

/** Thin gold-tinted divider between major sections. */
function Divider() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
      <div className="hairline h-px w-full opacity-60" aria-hidden />
    </div>
  );
}

export default function App() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#f5f5f5] antialiased">
      <Background />
      <Cursor />
      <ScrollProgress />

      <a
        href="#projects"
        className="sr-only rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
      >
        Skip to projects
      </a>

      <Navbar />

      <motion.main
        id="main"
        className="relative z-10"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <ProjectShowcase />
        <GitHubSection />
        <Journey />
        <Divider />
        <Contact />
      </motion.main>

      <Footer />
    </div>
  );
}
