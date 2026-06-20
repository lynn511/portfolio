'use client'
import { useState } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

interface ExperienceEntry {
  id: string
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  skills: string[]
}

function fmtDate(d: string): string {
  if (d === 'Present') return 'Present'
  const [y, m] = d.split('-').map(Number)
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ExperienceRow({ entry, isLast }: { entry: ExperienceEntry; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  const isCurrent = entry.endDate === 'Present'
  const hasMore = entry.description.length > 1 || entry.skills.length > 0
  const dateStr = `${fmtDate(entry.startDate)} – ${fmtDate(entry.endDate)}`

  const expandable = hasMore ? (
    <>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-brand ${
          open ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        {entry.description.length > 1 && (
          <ul className="mt-3 space-y-1.5">
            {entry.description.slice(1).map((d, i) => (
              <li key={i} className="flex gap-2 text-[13px] text-muted leading-relaxed">
                <span className="text-green flex-shrink-0 mt-0.5">·</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        )}
        {entry.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {entry.skills.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-[3px] border border-hairline font-heading font-semibold uppercase tracking-[0.1em] text-faint"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-3 text-[11px] font-heading font-semibold text-muted hover:text-green-deep transition-colors focus-ring"
      >
        {open ? 'See less ↑' : 'See more ↓'}
      </button>
    </>
  ) : null

  const cardContent = (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-0.5">
        <span className="font-heading font-semibold text-[15px] text-ink">{entry.company}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-[3px] border border-hairline font-heading font-semibold uppercase tracking-[0.1em] text-faint">
          {entry.location}
        </span>
      </div>
      <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.14em] text-green-deep mb-2">
        {entry.position}
      </p>
      <p className="text-[13px] text-muted leading-relaxed">{entry.description[0]}</p>
      {expandable}
    </>
  )

  const dotClass = isCurrent
    ? 'bg-green animate-livePulse'
    : 'bg-ink'

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden flex gap-3 pb-8">
        <div className="flex flex-col items-center pt-1 flex-shrink-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`} />
          {!isLast && <div className="flex-1 w-px bg-hairline mt-1" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-heading text-muted tabular-nums mb-2">{dateStr}</p>
          <div className="p-3">{cardContent}</div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[96px_20px_1fr] gap-x-5">
        <div className="text-right pt-1 pb-10">
          <span className="text-[11px] font-heading text-muted tabular-nums leading-[1.8]">
            {fmtDate(entry.startDate)}
            <br />
            <span className="opacity-50">–</span>
            <br />
            {fmtDate(entry.endDate)}
          </span>
        </div>
        <div className="flex flex-col items-center pb-10">
          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 relative z-10 ${dotClass}`} />
          <div className={`flex-1 w-px bg-hairline mt-1 ${isLast ? 'opacity-0' : ''}`} />
        </div>
        <div className="pb-10">
          <div className="p-4 rounded-[4px] hover:bg-hairline/40 transition-colors duration-200">
            {cardContent}
          </div>
        </div>
      </div>
    </>
  )
}

const VISIBLE_COUNT = 4

export default function Experience({ experience }: { experience: ExperienceEntry[] }) {
  const [showAll, setShowAll] = useState(false)
  const visible = experience.slice(0, VISIBLE_COUNT)
  const hidden = experience.slice(VISIBLE_COUNT)

  return (
    <section id="experience" className="py-24 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Career"
            heading="Experience"
            sub="Where I've worked and what I've built."
          />
        </Reveal>

        <div>
          {visible.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.07}>
              <ExperienceRow
                entry={entry}
                isLast={i === visible.length - 1 && hidden.length === 0}
              />
            </Reveal>
          ))}

          {hidden.length > 0 && (
            <>
              <div
                className={`overflow-hidden transition-[max-height] duration-700 ease-brand ${
                  showAll ? 'max-h-[4000px]' : 'max-h-0'
                }`}
              >
                {hidden.map((entry, i) => (
                  <Reveal key={entry.id} delay={i * 0.07}>
                    <ExperienceRow entry={entry} isLast={i === hidden.length - 1} />
                  </Reveal>
                ))}
              </div>

              <div className="md:grid md:grid-cols-[96px_20px_1fr] md:gap-x-5 pb-4">
                <div className="hidden md:block" />
                <div className="hidden md:block" />
                <div>
                  <button
                    onClick={() => setShowAll((s) => !s)}
                    className="text-[11px] font-heading font-semibold uppercase tracking-[0.1em] px-5 py-2 rounded-[4px] border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200 ease-brand focus-ring"
                  >
                    {showAll ? 'Show less ↑' : 'Show all experience ↓'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
