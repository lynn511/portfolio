import Image from 'next/image'
import type { FC } from 'react'

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

const SKILL_GROUPS = [
  {
    label: 'ML & Research',
    featured: 'GNN',
    keywords: ['GNN', 'GAT', 'PyTorch', 'Multi-agent Systems', 'SPADE', 'Graph Neural Networks'],
  },
  {
    label: 'Cryptography',
    featured: 'Applied Cryptography',
    keywords: ['Applied Cryptography', 'Go', 'Provable Security', 'PRF/PRG'],
  },
  {
    label: 'Systems & Infra',
    featured: 'FastAPI',
    keywords: ['FastAPI', 'Next.js', 'AWS Lambda', 'OpenTofu', 'Supabase', 'TypeScript', 'Python', 'Docker'],
  },
]

const About: FC<Props> = ({ bio, role, displayName, profileImage, skills, socials }) => {
  const skillNames = new Set(skills.map((s) => s.name.toLowerCase()))

  const nameParts = displayName.split(' ')
  const nameLine1 = nameParts.slice(0, -1).join(' ')
  const nameLine2 = nameParts[nameParts.length - 1].toUpperCase()
  const greenIdx = nameLine2.indexOf('A')

  return (
    <section id="about" className="py-20 px-6 bg-ink">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">

        {/* LEFT COLUMN */}
        <div>
          {/* Profile image */}
          <div
            className="relative overflow-hidden"
            style={{
              width: 200,
              height: 260,
              border: '1.5px solid #2a2a2a',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <Image
              src={profileImage}
              alt={displayName}
              fill
              sizes="200px"
              className="object-cover object-top"
            />
          </div>

          {/* Green strip beneath photo */}
          <div style={{ width: 200, height: 4, background: '#00C24A' }} />

          {/* Social links */}
          <div className="flex flex-col mt-3" style={{ gap: 6, width: 200 }}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target={s.link.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="block text-center uppercase font-bold text-[10px] tracking-[0.08em] text-faint hover:text-green border-[1.5px] border-[#2a2a2a] hover:border-green rounded-[3px] px-[10px] py-[6px] transition-colors duration-150 focus-ring"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center mb-[10px]" style={{ gap: 6 }}>
            <div style={{ width: 24, height: 2, background: '#00C24A', flexShrink: 0 }} />
            <span
              className="uppercase font-bold text-green"
              style={{ fontSize: 10, letterSpacing: '0.14em' }}
            >
              WHO I AM
            </span>
          </div>

          {/* Name */}
          <p
            className="uppercase text-white font-heading font-black"
            style={{ fontSize: 38, letterSpacing: '-0.05em', lineHeight: 0.9 }}
          >
            {nameLine1}
            <br />
            {greenIdx >= 0 ? (
              <>
                {nameLine2.slice(0, greenIdx)}
                <span style={{ color: '#00C24A' }}>{nameLine2[greenIdx]}</span>
                {nameLine2.slice(greenIdx + 1)}
              </>
            ) : (
              nameLine2
            )}
          </p>

          {/* Role */}
          <p
            className="uppercase font-bold text-green"
            style={{ fontSize: 10, letterSpacing: '0.14em', marginTop: 8, marginBottom: 0 }}
          >
            {role}
          </p>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #1f1f1f', margin: '16px 0' }} />

          {/* Bio */}
          <p className="text-faint" style={{ fontSize: 13, lineHeight: 1.7 }}>
            {bio}
          </p>

          {/* Skill groups */}
          <div style={{ marginTop: 20 }}>
            {SKILL_GROUPS.map((group) => {
              const matched = group.keywords.filter((k) => skillNames.has(k.toLowerCase()))
              if (matched.length === 0) return null
              return (
                <div key={group.label}>
                  <p
                    className="uppercase font-bold text-muted"
                    style={{ fontSize: 9, letterSpacing: '0.14em', marginBottom: 5 }}
                  >
                    {group.label}
                  </p>
                  <div className="flex flex-wrap" style={{ gap: 4, marginBottom: 12 }}>
                    {matched.map((k) => {
                      const isFeatured = k.toLowerCase() === group.featured.toLowerCase()
                      return (
                        <span
                          key={k}
                          className="font-heading bg-transparent"
                          style={{
                            fontSize: 10,
                            border: `1px solid ${isFeatured ? '#00A03D' : '#2a2a2a'}`,
                            borderRadius: 3,
                            padding: '2px 8px',
                            color: isFeatured ? '#00A03D' : '#9a9a9a',
                          }}
                        >
                          {k}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
