import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 lg:px-16 py-12">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold">
            Poovaragan S<span className="text-accent">.</span>
          </p>
          <p className="text-sm text-fg-muted mt-1">
            AI Automation Builder · Backend Developer · Technical Content Writer
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${profile.links.email}`}
            aria-label="Email"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            <Mail size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            <Github size={18} />
          </a>
        </div>

        <p className="text-xs text-fg-faint font-mono">
          © {new Date().getFullYear()} Poovaragan S. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
