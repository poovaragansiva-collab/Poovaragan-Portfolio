import { ArrowUpRight, GitBranch, Star, Terminal } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon } from "./icons";
import { Reveal } from "./ui/Reveal";

const points = [
  {
    icon: GitBranch,
    title: "Public repositories",
    body: "Every project listed here is versioned and readable in the open.",
  },
  {
    icon: Terminal,
    title: "Commit history over claims",
    body: "The commit log is the honest version of a résumé.",
  },
  {
    icon: Star,
    title: "Work in progress welcome",
    body: "Some repos are experiments — that's the point of learning in public.",
  },
];

export function GitHubSection() {
  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-4 sm:px-8 lg:px-10">
      <Reveal>
        <div className="glass sheen relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.16), transparent 70%)",
            }}
          />
          <div className="relative grid gap-9 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/70" />
                <span className="font-mono text-[10.5px] tracking-[0.28em] text-[#d4af37] uppercase">
                  Proof of work
                </span>
              </div>
              <h2 className="mt-5 text-[clamp(1.7rem,4.4vw,2.6rem)] leading-[1.1] font-semibold tracking-tight text-[#f5f5f5]">
                Everything I build lives on{" "}
                <span className="gold-text">GitHub.</span>
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#a1a1a1]">
                No dashboards of invented metrics. If you want to see how I
                actually write code, the repositories are the fastest way.
              </p>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-xl border border-[#d4af37]/45 bg-[#d4af37]/[0.09] px-5 py-3.5 text-[14px] font-semibold text-[#f5d76e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/80 hover:shadow-[0_0_34px_-8px_rgba(212,175,55,0.6)]"
              >
                <GithubIcon className="h-4 w-4" />
                Explore My GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-3 font-mono text-[11px] text-[#a1a1a1]/70">
                github.com/{site.githubHandle}
              </p>
            </div>

            <ul className="space-y-3">
              {points.map((p, i) => (
                <Reveal as="li" key={p.title} delay={0.08 * i}>
                  <div className="flex items-start gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.022] p-4 transition-colors duration-300 hover:border-[#d4af37]/22 hover:bg-white/[0.04]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <p.icon className="h-4 w-4 text-[#d4af37]" strokeWidth={1.6} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#f5f5f5]">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[#a1a1a1]">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
