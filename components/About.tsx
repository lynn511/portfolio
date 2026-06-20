import Image from 'next/image'
import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

interface Social {
  name: string
  username: string
  link: string
}

interface Props {
  bio: string
  role: string
  displayName: string
  profileImage: string
  socials: Social[]
}

const About: FC<Props> = ({ bio, role, displayName, profileImage, socials }) => {
  return (
    <section id="about" className="py-24 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Who I am"
            heading="About"
            index="01 / 07"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Profile image — ink offset frame */}
          <Reveal className="relative inline-block w-full max-w-sm mx-auto lg:mx-0 order-last lg:order-first">
            <div className="absolute -bottom-3 -right-3 w-full h-full border-[1.5px] border-ink rounded-[6px]" />
            <div className="relative z-10 rounded-[6px] overflow-hidden aspect-square">
              <Image
                src={profileImage}
                alt={displayName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.1}>
            <div>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-green-deep mb-2">
                {role}
              </p>
              <h3 className="font-heading font-semibold text-[clamp(24px,3vw,32px)] tracking-[-0.03em] text-ink mb-5">
                {displayName}
              </h3>

              <p className="text-[15px] text-muted leading-[1.7] mb-7 max-w-lg">
                {bio}
              </p>

              {/* CV button */}
              <a
                href="/lynn-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-green text-ink text-[11px] font-heading font-semibold uppercase tracking-[0.1em] hover:bg-green-deep transition-colors duration-200 ease-brand active:scale-95 focus-ring mb-8"
              >
                <span className="text-[10px] leading-none">↓</span>
                Download CV
              </a>

              {/* Socials */}
              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target={s.link.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] border-[1.5px] border-hairline text-[12px] font-heading font-medium text-ink hover:border-green-deep hover:text-green-deep transition-colors duration-200 ease-brand focus-ring"
                  >
                    {s.name}
                    <span className="text-faint text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
