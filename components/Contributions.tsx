import Image from 'next/image'
import type { FC } from 'react'
import SectionHeading from './SectionHeading'

interface Contribution {
  title: string
  date?: string
  organizer: string
  description: string
  link: string
  photo: string
}

interface Props {
  contributions: Contribution[]
}

const Contributions: FC<Props> = ({ contributions }) => {
  return (
    <section id="contributions" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <SectionHeading
          eyebrow="Impact"
          heading="Contributions"
          sub="Research, press, and public impact."
        />

        <div className="flex flex-col gap-[2px] bg-gray-200 dark:bg-white/15">
          {contributions.map((c) => {
            const isResearch = c.organizer.includes('IEEE')
            const badgeLabel = isResearch ? 'Research Paper' : 'Press Feature'
            const linkLabel = isResearch ? 'Read the paper' : 'Read the article'

            return (
              <article
                key={c.title}
                className="group relative flex flex-col sm:flex-row bg-white dark:bg-white/5 hover:bg-orange-50 dark:hover:bg-white/10 transition-colors duration-300"
              >
                {/* Orange left border — scaleY from bottom on hover */}
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-[400ms]" />

                {/* Image column */}
                <div className="relative w-full sm:w-[280px] flex-shrink-0 h-[210px] sm:h-auto overflow-hidden">
                  <Image
                    src={c.photo}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 right-3 text-xs bg-black/50 text-white px-2 py-1 rounded">
                    {c.organizer}
                  </span>
                </div>

                {/* Content column */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="flex justify-end mb-4">
                    <span className="bg-brand-blue text-white text-xs px-3 py-1 rounded-full font-medium">
                      {badgeLabel}
                    </span>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">
                    {c.organizer}
                  </p>

                  <h3 className="font-heading font-black text-[clamp(20px,2vw,28px)] tracking-tight leading-snug text-gray-900 dark:text-white mb-4">
                    {c.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-blue-100 leading-[1.75] max-w-[540px] mb-6">
                    {c.description}
                  </p>

                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link text-sm font-medium text-gray-700 dark:text-blue-100 hover:text-brand-orange transition-colors relative inline-flex items-center gap-1.5 w-fit"
                  >
                    {linkLabel}
                    <span>↗</span>
                    <span className="absolute -bottom-0.5 left-0 h-px bg-brand-orange w-0 group-hover/link:w-full transition-all duration-300" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Contributions
