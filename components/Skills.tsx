import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

interface Skill {
  name: string
}

interface Props {
  skills: Skill[]
}

interface DomainGroup {
  label: string
  highlight: string
  keys: string[]
}

const DOMAIN_GROUPS: DomainGroup[] = [
  {
    label: 'ML & RESEARCH',
    highlight: 'Python',
    keys: ['Python', 'PyTorch', 'TensorFlow', 'MLflow'],
  },
  {
    label: 'KNOWLEDGE SYSTEMS',
    highlight: 'LangChain',
    keys: ['LangChain', 'ChromaDB'],
  },
  {
    label: 'SYSTEMS & INFRA',
    highlight: 'AWS',
    keys: ['AWS', 'Docker', 'FastAPI', 'OpenTofu', 'Vercel', 'GitHub Actions', 'Git'],
  },
]

const Skills: FC<Props> = ({ skills }) => {
  const skillNames = new Set(skills.map((s) => s.name))

  const groups = DOMAIN_GROUPS.map((group) => ({
    ...group,
    skills: group.keys.filter((k) => skillNames.has(k)),
  }))

  // Any skill not in a defined group falls into "OTHER"
  const claimed = new Set(DOMAIN_GROUPS.flatMap((g) => g.keys))
  const other = skills.map((s) => s.name).filter((n) => !claimed.has(n))

  return (
    <section id="skills" className="py-24 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            heading="Skills"
            index="03 / 07"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.08}>
              <div className="group border-[1.5px] border-ink rounded-[6px] p-6 transition-colors duration-200 ease-brand hover:border-green-deep h-full">
                {/* Domain label */}
                <span className="block text-[10px] font-heading font-semibold uppercase tracking-[0.18em] text-faint mb-5">
                  {group.label}
                </span>

                {/* Skills */}
                <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                  {group.skills.map((name) => {
                    const isHighlight = name === group.highlight
                    return (
                      <span
                        key={name}
                        className={`text-[13px] font-heading leading-snug transition-colors duration-200 ${
                          isHighlight
                            ? 'text-green-deep font-semibold'
                            : 'text-ink font-medium'
                        }`}
                      >
                        {name}
                      </span>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Overflow group for any uncategorised skills */}
          {other.length > 0 && (
            <Reveal delay={groups.length * 0.08}>
              <div className="group border-[1.5px] border-ink rounded-[6px] p-6 transition-colors duration-200 ease-brand hover:border-green-deep h-full">
                <span className="block text-[10px] font-heading font-semibold uppercase tracking-[0.18em] text-faint mb-5">
                  OTHER
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                  {other.map((name) => (
                    <span key={name} className="text-[13px] font-heading font-medium text-ink leading-snug">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

export default Skills
