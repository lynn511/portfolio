'use client'
import { useState } from 'react'
import SectionHeading from './SectionHeading'

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

function ExperienceRow({
  entry,
  isLast,
}: {
  entry: ExperienceEntry
  isLast: boolean
}) {
  const [open, setOpen] = useState(false)
  const isCurrent = entry.endDate === 'Present'
  const hasMore = entry.description.length > 1 || entry.skills.length > 0

  return (
    <div className="grid grid-cols-[72px_16px_1fr] sm:grid-cols-[96px_20px_1fr] gap-x-3 sm:gap-x-5">
      {/* Date */}
      <div className="text-right pt-1 pb-10">
        <span className="text-[11px] sm:text-xs text-gray-400 dark:text-blue-300 tabular-nums leading-[1.8]">
          {fmtDate(entry.startDate)}
          <br />
          <span className="opacity-60">–</span>
          <br />
          {fmtDate(entry.endDate)}
        </span>
      </div>

      {/* Dot + connector */}
      <div className="flex flex-col items-center pb-10">
        <div
          className={`w-2 h-2 rounded-full bg-brand-orange mt-1.5 flex-shrink-0 relative z-10 ${
            isCurrent ? 'animate-pulse' : ''
          }`}
        />
        <div
          className={`flex-1 w-px bg-brand-orange/25 mt-1 ${isLast ? 'opacity-0' : ''}`}
        />
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="rounded-xl p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300">
          {/* Company + location */}
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="font-heading font-bold text-gray-900 dark:text-white">
              {entry.company}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-blue-200 font-medium">
              {entry.location}
            </span>
          </div>

          {/* Position */}
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">
            {entry.position}
          </p>

          {/* First bullet — always visible */}
          <p className="text-sm text-gray-600 dark:text-blue-100 leading-relaxed">
            {entry.description[0]}
          </p>

          {/* Expandable content */}
          {hasMore && (
            <>
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  open ? 'max-h-[600px]' : 'max-h-0'
                }`}
              >
                {entry.description.length > 1 && (
                  <ul className="mt-3 space-y-1.5">
                    {entry.description.slice(1).map((d, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-gray-600 dark:text-blue-100 leading-relaxed"
                      >
                        <span className="text-brand-orange flex-shrink-0 mt-0.5">·</span>
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
                        className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-blue-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setOpen((o) => !o)}
                className="mt-2.5 text-xs text-gray-400 dark:text-blue-300 hover:text-brand-orange transition-colors"
              >
                {open ? 'See less ↑' : 'See more ↓'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Experience({
  experience,
}: {
  experience: ExperienceEntry[]
}) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Career"
          heading="Experience"
          sub="Where I've worked and what I've built."
        />
        <div>
          {experience.map((entry, i) => (
            <ExperienceRow
              key={entry.id}
              entry={entry}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
