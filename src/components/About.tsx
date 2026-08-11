import { GraduationCap, MapPin, Sparkles, Terminal } from "lucide-react";
import { about, site } from "@/data/site";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { FocusAreas } from "./FocusAreas";

const icons = [GraduationCap, Terminal, MapPin, Sparkles];

export function About() {
  return (
    <Section id="about" label="About">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About Me"
            title={
              <>
                Student by enrollment,{" "}
                <span className="gold-text">builder by habit.</span>
              </>
            }
          />

          <Reveal delay={0.16}>
            <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md sm:grid-cols-2">
              {about.facts.map((fact, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <div
                    key={fact.label}
                    className="group relative bg-[#080808]/40 p-5 transition-colors duration-300 hover:bg-white/[0.035]"
                  >
                    <dt className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#a1a1a1]/80 uppercase">
                      <Icon className="h-3.5 w-3.5 text-[#d4af37]" aria-hidden />
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-[13.5px] leading-snug font-medium text-[#f5f5f5]">
                      {fact.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        <div className="lg:pt-4">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <p className="mb-5 text-[15px] leading-[1.85] text-[#a1a1a1] sm:text-[16.5px]">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.28}>
            <div className="glass sheen relative mt-8 overflow-hidden rounded-2xl p-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-[#d4af37] uppercase">
                Currently
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#f5f5f5]/85">
                Building AI-assisted products and automation workflows while
                completing my B.E. in Computer Science — based in {" "}
                <span className="text-[#f5d76e]">{site.location}</span>.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <FocusAreas />
    </Section>
  );
}
