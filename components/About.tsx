import Image from 'next/image'
import type { FC } from 'react'
import SectionHeading from './SectionHeading'

interface Social {
  name: string
  username: string
  link: string
}

interface Skill {
  name: string
}

interface Props {
  bio: string
  role: string
  displayName: string
  profileImage: string
  skills: Skill[]
  socials: Social[]
}

const socialIcons: Record<string, string> = {
  Github: 'GH',
  LinkedIn: 'LI',
  Medium: 'ME',
  Gmail: '@',
}

const About: FC<Props> = ({ bio, role, displayName, profileImage, skills, socials }) => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Who I am"
          heading="About"
          sub="Builder at the intersection of AI, systems, and people."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Profile image with offset orange border frame */}
          <div className="relative inline-block w-full max-w-sm mx-auto lg:mx-0">
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-orange rounded-2xl" />
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-square">
              <Image
                src={profileImage}
                alt={displayName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-semibold text-brand-orange uppercase tracking-widest mb-2">
              {role}
            </p>
            <h3 className="font-heading text-3xl font-black text-gray-900 dark:text-white mb-5">
              {displayName}
            </h3>

            <p className="text-gray-600 dark:text-blue-100 leading-relaxed mb-6 max-w-lg">
              {bio}
            </p>

            {/* CV download button */}
            <a
              href="/lynn-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-orange text-white font-medium hover:bg-orange-700 transition-colors mb-8"
            >
              <span className="text-base leading-none">↓</span>
              Download CV
            </a>

            {/* Skills */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-400 dark:text-blue-300 uppercase tracking-widest mb-3">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s.name}
                    className="text-sm px-3 py-1.5 rounded-full bg-brand-blue/10 dark:bg-white/10 text-brand-blue dark:text-blue-200 font-medium"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target={s.link.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/20 hover:border-brand-orange dark:hover:border-brand-orange hover:text-brand-orange transition-colors text-sm text-gray-600 dark:text-blue-100"
                >
                  <span className="text-xs font-bold text-brand-blue dark:text-blue-300">
                    {socialIcons[s.name] ?? s.name[0]}
                  </span>
                  {s.username}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
