import { ArrowUpRight, Copy, Check, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — mailto still works */
    }
  };

  const links = [
    {
      label: "Email Me",
      value: site.email,
      href: `mailto:${site.email}?subject=Opportunity%20for%20Poovaragan%20S`,
      Icon: Mail,
      primary: true,
      external: false,
    },
    {
      label: "LinkedIn",
      value: site.linkedinHandle,
      href: site.linkedin,
      Icon: LinkedinIcon,
      primary: false,
      external: true,
    },
    {
      label: "GitHub",
      value: site.githubHandle,
      href: site.github,
      Icon: GithubIcon,
      primary: false,
      external: true,
    },
  ];

  return (
    <Section id="contact" label="Contact" className="pb-24 md:pb-32">
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 w-[70%] rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/70" />
              <span className="font-mono text-[10.5px] tracking-[0.28em] text-[#d4af37] uppercase">
                Contact
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/70" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 text-[clamp(2rem,6vw,3.6rem)] leading-[1.05] font-bold tracking-tight text-balance text-[#f5f5f5]">
              Let's Build <span className="gold-text">Something.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#a1a1a1] sm:text-[16.5px]">
              Have a project, internship opportunity, or idea worth exploring?
              Let's connect.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              {links.map(({ label, href, Icon, primary, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className={
                    primary
                      ? "group inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/[0.11] px-6 py-3.5 text-[14px] font-semibold text-[#f5d76e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/85 hover:shadow-[0_0_38px_-8px_rgba(212,175,55,0.65)]"
                      : "group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.035] px-6 py-3.5 text-[14px] font-semibold text-[#f5f5f5] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.07]"
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <button
                onClick={copyEmail}
                className="group inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 font-mono text-[12px] text-[#a1a1a1] transition-colors hover:border-[#d4af37]/35 hover:text-[#f5d76e]"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[#d4af37]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : site.email}
              </button>
              <span className="inline-flex items-center gap-2 font-mono text-[12px] text-[#a1a1a1]/70">
                <MapPin className="h-3.5 w-3.5 text-[#d4af37]/70" aria-hidden />
                {site.location}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
