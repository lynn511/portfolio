import type { FC } from 'react'
import SectionHeading from './SectionHeading'

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

const PinIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block flex-shrink-0"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Education: FC<Props> = ({ education }) => {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Academic Background"
          heading="Education"
          sub="Degrees and academic training."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((entry) => {
            const isCurrent = entry.endDate.toLowerCase() === 'present'
            const dateRange = `${fmtYear(entry.startDate)} – ${fmtYear(entry.endDate)}`

            return (
              <article
                key={entry.degree}
                className="group relative rounded-2xl p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-brand-orange hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Orange left accent for current degree */}
                {isCurrent && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange" />
                )}

                {/* Date badge row */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-blue-200 font-medium">
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse flex-shrink-0" />
                    )}
                    {dateRange}
                  </span>
                </div>

                {/* Institution */}
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">
                  {entry.institution}
                </p>

                {/* Degree */}
                <h3 className="text-[20px] font-bold leading-snug text-gray-900 dark:text-white mb-3">
                  {entry.degree}
                </h3>

                {/* Location */}
                <p className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-blue-300 mb-3">
                  <PinIcon />
                  {entry.location}
                </p>

                {/* Description */}
                <p className="text-[14px] text-gray-500 dark:text-blue-100 leading-[1.75]">
                  {entry.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Education
