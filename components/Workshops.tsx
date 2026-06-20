import Image from 'next/image'
import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

interface Workshop {
  title: string
  organizer: string
  description: string
  link: string
  photo: string
}

interface Props {
  workshops: Workshop[]
}

const Workshops: FC<Props> = ({ workshops }) => {
  return (
    <section id="workshops" className="py-24 px-6 bg-ink border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Teaching"
            heading="Workshops"
            sub="Hands-on AI sessions across universities and organisations."
            variant="dark"
          />
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-5">
          {workshops.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.07}>
              <a
                href={w.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-[1.5px] border-[#333333] overflow-hidden bg-[#1a1a1a] hover:border-green motion-safe:hover:-translate-y-[5px] motion-safe:transition-all duration-300 ease-brand focus-ring"
                style={i === 0 ? { borderLeftWidth: '4px', borderLeftColor: '#00C24A', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: '6px', borderBottomRightRadius: '6px' } : { borderRadius: '6px' }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={w.photo}
                    alt={w.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover motion-safe:group-hover:scale-[1.04] motion-safe:transition-transform duration-500 ease-brand"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-heading font-semibold uppercase tracking-[0.14em] text-green mb-1.5">
                    {w.organizer}
                  </p>
                  <h3 className="font-heading font-semibold text-[15px] tracking-[-0.01em] text-paper mb-2">
                    {w.title}
                  </h3>
                  <p className="text-[13px] text-faint leading-relaxed">{w.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Workshops
