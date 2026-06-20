import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

interface EducationEntry {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface Props {
  education: EducationEntry[]
}

function fmtYear(d: string): string {
  if (d.toLowerCase() === 'present') return 'Present'
  return String(new Date(d).getFullYear())
}

const Education: FC<Props> = ({ education }) => {
  return (
    <section id="education" className="py-24 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Academic Background"
            heading="Education"
            sub="Degrees and academic training."
            index="03 / 07"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((entry, i) => {
            const isCurrent = entry.endDate.toLowerCase() === 'present'
            const dateRange = `${fmtYear(entry.startDate)} – ${fmtYear(entry.endDate)}`

            return (
              <Reveal key={entry.degree} delay={i * 0.08}>
                <article className="relative border-[1.5px] border-ink rounded-[6px] p-7 bg-paper hover:border-green-deep motion-safe:hover:-translate-y-[5px] motion-safe:transition-all duration-300 ease-brand overflow-hidden h-full">
                  {/* Green left accent for current degree */}
                  {isCurrent && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-green" />
                  )}

                  {/* Date badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-[3px] bg-ink/5 text-ink">
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green animate-livePulse flex-shrink-0" />
                      )}
                      {dateRange}
                    </span>
                  </div>

                  {/* Institution */}
                  <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.14em] text-green-deep mb-2">
                    {entry.institution}
                  </p>

                  {/* Degree */}
                  <h3 className="font-heading font-semibold text-[18px] tracking-[-0.02em] leading-snug text-ink mb-3">
                    {entry.degree}
                  </h3>

                  {/* Location */}
                  <p className="text-[12px] text-faint mb-3">{entry.location}</p>

                  {/* Description */}
                  <p className="text-[13px] text-muted leading-[1.75]">{entry.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Education
