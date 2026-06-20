import Image from 'next/image'
import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

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
    <section id="contributions" className="py-24 px-6 bg-ink border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Impact"
            heading="Contributions"
            sub="Research, press, and public impact."
            variant="dark"
          />
        </Reveal>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {contributions.map((c, i) => {
            const isResearch = c.organizer.includes('IEEE')
            const badgeLabel = isResearch ? 'Research Paper' : 'Press Feature'
            const linkLabel = isResearch ? 'Read the paper' : 'Read the article'

            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className={`group relative flex flex-col sm:flex-row bg-transparent hover:bg-white/5 transition-colors duration-300 ${isResearch ? 'border-l-4 border-l-[#00C24A]' : ''}`}>
                  {/* Hover green bar — only for non-research entries */}
                  {!isResearch && (
                    <div className="absolute top-0 left-0 w-[3px] h-full bg-green origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-brand" />
                  )}

                  {/* Image */}
                  <div className="relative w-full sm:w-[260px] flex-shrink-0 h-[200px] sm:h-auto overflow-hidden">
                    <Image
                      src={c.photo}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover motion-safe:group-hover:scale-[1.04] motion-safe:transition-transform duration-500 ease-brand"
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] font-heading font-semibold uppercase tracking-[0.1em] bg-black/60 text-paper px-2 py-1 rounded-[3px]">
                      {c.organizer}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7 flex flex-col justify-center">
                    <div className="flex justify-end mb-4">
                      <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.12em] bg-white/10 text-paper px-3 py-1 rounded-[3px]">
                        {badgeLabel}
                      </span>
                    </div>

                    <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.14em] text-green mb-2">
                      {c.organizer}
                    </p>

                    <h3 className="font-heading font-semibold text-[clamp(18px,2vw,24px)] tracking-[-0.02em] leading-snug text-paper mb-4">
                      {c.title}
                    </h3>

                    <p className="text-[13px] text-faint leading-[1.75] max-w-[540px] mb-6">
                      {c.description}
                    </p>

                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="green-sweep text-[12px] font-heading font-semibold text-green hover:text-paper transition-colors duration-200 inline-flex items-center gap-1.5 w-fit focus-ring"
                    >
                      {linkLabel}
                      <span>↗</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contributions
