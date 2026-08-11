import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="hairline absolute inset-x-0 top-0 h-px" aria-hidden />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 py-10 sm:px-8 md:flex-row md:justify-between lg:px-10">
        <div className="text-center md:text-left">
          <p className="text-[13.5px] font-medium text-[#f5f5f5]/85">
            Designed &amp; Built by {site.name}
          </p>
          <p className="mt-1 font-mono text-[11px] text-[#a1a1a1]/70">
            © 2026 {site.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-[#a1a1a1] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:text-[#f5d76e]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-[#a1a1a1] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:text-[#f5d76e]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Send an email"
            className="flex h-10 items-center rounded-xl border border-white/[0.09] bg-white/[0.025] px-3.5 font-mono text-[11px] text-[#a1a1a1] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:text-[#f5d76e]"
          >
            Email
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/[0.07] text-[#d4af37] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/60"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
