import { GraduationCap } from "lucide-react";
import { education, highlights, journey } from "@/data/site";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export function Journey() {
  return (
    <Section id="experience" label="Developer journey">
      <SectionHeading
        eyebrow="Journey"
        title={
          <>
            Developer <span className="gold-text">Journey</span>
          </>
        }
        description="No invented job titles — an honest record of what I've been building and studying."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* timeline */}
        <ol className="relative">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-[#d4af37]/50 via-white/10 to-transparent"
          />
          {journey.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 0.1} className="relative pb-10 pl-9 last:pb-0">
              <span
                aria-hidden
                className="absolute top-1.5 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#d4af37]/45 bg-[#080808]"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-[#f5d76e]" />
              </span>
              <p className="font-mono text-[10.5px] tracking-[0.24em] text-[#d4af37] uppercase">
                {item.year}
              </p>
              <h3 className="mt-2 text-[17px] leading-snug font-semibold text-[#f5f5f5] sm:text-[18.5px]">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-[#a1a1a1]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>

        {/* education + highlights */}
        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="glass sheen relative overflow-hidden rounded-2xl p-6">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/28 bg-[#d4af37]/[0.07]">
                  <GraduationCap className="h-4.5 w-4.5 text-[#d4af37]" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] text-[#a1a1a1]/80 uppercase">
                    Education
                  </p>
                  <h3 className="mt-2 text-[16px] leading-snug font-semibold text-[#f5f5f5]">
                    {education.degree}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-[#a1a1a1]">{education.school}</p>
                  <p className="text-[13px] text-[#a1a1a1]/75">{education.place}</p>
                  <p className="mt-3 inline-block rounded-lg border border-[#d4af37]/22 bg-[#d4af37]/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-[#f5d76e]">
                    {education.period}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-md">
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#d4af37] uppercase">
                Highlights
              </p>
              <ul className="mt-4 divide-y divide-white/[0.06]">
                {highlights.map((h) => (
                  <li key={h.label} className="group py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] font-semibold text-[#f5f5f5]">
                        {h.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-[#d4af37]/80 uppercase">
                        {h.value}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[#a1a1a1]">
                      {h.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
