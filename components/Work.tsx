import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

interface Project {
  id: string
  title: string
  shortDescription: string
  categories: string[]
  techStack: string[]
  links: {
    liveDemo?: string
    article?: string
    github?: string
  }
}

interface CardData {
  id: string
  title: string
  description: string
  tags: string[]
  links: { liveDemo?: string; article?: string; github?: string }
  stripVariant: 'flagship' | 'secondary' | 'tertiary'
  isLive: boolean
  isPlaceholder?: boolean
}

interface Props {
  projects: Project[]
}

// Strip styles by variant
const stripStyles = {
  flagship: { bar: 'bg-green', label: 'text-ink', index: 'text-ink/50', dot: 'bg-ink' },
  secondary: { bar: 'bg-ink',  label: 'text-paper', index: 'text-paper/40', dot: 'bg-paper' },
  tertiary:  { bar: 'bg-paper border-b border-hairline', label: 'text-ink', index: 'text-faint', dot: 'bg-ink' },
}

function Card({ card, num }: { card: CardData; num: string }) {
  const s = stripStyles[card.stripVariant]
  const hasLink = card.links.liveDemo ?? card.links.github ?? card.links.article

  // Primary href for the stretched link (covers whole card)
  const primaryHref = card.links.liveDemo ?? card.links.github

  return (
    <article className="group relative flex flex-col border-[1.5px] border-ink rounded-[6px] overflow-hidden bg-paper motion-safe:transition-all motion-safe:duration-300 ease-brand motion-safe:hover:-translate-y-[5px] motion-safe:hover:shadow-[0_10px_0_-4px_#00C24A] h-full">

      {/* Stretched primary link — covers the whole card, sits below content */}
      {!card.isPlaceholder && primaryHref && (
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 focus-ring rounded-[6px] z-0"
          aria-label={card.title}
        />
      )}

      {/* Top meta strip */}
      <div className={`flex items-center justify-between px-4 py-3 shrink-0 ${s.bar}`}>
        <div className="flex items-center gap-2">
          {card.isLive && (
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 animate-livePulse ${s.dot}`} aria-label="Live" />
          )}
          <span className={`text-[10px] font-heading font-semibold uppercase tracking-[0.14em] ${s.label}`}>
            {card.isPlaceholder ? 'FLAGSHIP — COMING SOON' : card.tags[0] ?? 'PROJECT'}
          </span>
        </div>
        <span className={`text-[11px] font-heading font-semibold tracking-[0.1em] ${s.index}`}>
          {num}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className={`font-heading font-semibold text-[16px] tracking-[-0.02em] leading-snug ${card.isPlaceholder ? 'text-faint' : 'text-ink'}`}>
            {card.title}
          </h3>
          {hasLink && (
            <span
              className="text-ink opacity-0 motion-safe:-translate-x-1 group-hover:opacity-100 motion-safe:group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-brand text-base shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </div>

        <p className={`text-[13px] leading-relaxed mb-5 ${card.isPlaceholder ? 'text-faint italic' : 'text-muted'}`}>
          {card.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {card.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-[3px] border border-hairline text-[10px] font-heading font-semibold uppercase tracking-[0.1em] text-faint"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Secondary links — sit above the stretched link via relative z-10 */}
        {!card.isPlaceholder && (
          <div className="relative z-10 flex gap-4 mt-auto">
            {card.links.liveDemo && (
              <a
                href={card.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-heading font-semibold text-green-deep hover:text-ink transition-colors focus-ring"
              >
                Live demo ↗
              </a>
            )}
            {card.links.article && (
              <a
                href={card.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-heading font-semibold text-muted hover:text-ink transition-colors focus-ring"
              >
                Article ↗
              </a>
            )}
            {card.links.github && (
              <a
                href={card.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-heading font-semibold text-muted hover:text-ink transition-colors focus-ring"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

const PLACEHOLDERS: CardData[] = [
  {
    id: 'placeholder-crypto',
    title: '[ Cryptography Flagship ]',
    description: 'This flagship project is coming soon — check back later.',
    tags: ['CRYPTOGRAPHY', 'SYSTEMS'],
    links: {},
    stripVariant: 'flagship',
    isLive: false,
    isPlaceholder: true,
  },
  {
    id: 'placeholder-social',
    title: '[ Social Impact Flagship ]',
    description: 'This flagship project is coming soon — check back later.',
    tags: ['SOCIAL IMPACT', 'AI'],
    links: {},
    stripVariant: 'flagship',
    isLive: false,
    isPlaceholder: true,
  },
]

const Work: FC<Props> = ({ projects }) => {
  const realCards: CardData[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.shortDescription,
    tags: [...p.categories, ...p.techStack],
    links: p.links,
    stripVariant: 'secondary',
    isLive: !!p.links.liveDemo,
    isPlaceholder: false,
  }))

  const allCards = [...realCards, ...PLACEHOLDERS]

  return (
    <section id="work" className="py-24 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            heading="Selected Work"
            sub="Things I've built and shipped."
            index="04 / 07"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {allCards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.08}>
              <Card card={card} num={String(i + 1).padStart(2, '0')} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
