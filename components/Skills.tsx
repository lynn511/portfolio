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
    highlight: 'GNN',
    keys: ['GNN', 'GAT', 'PyTorch', 'Multi-agent Systems', 'SPADE', 'Graph Neural Networks'],
  },
  {
    label: 'CRYPTOGRAPHY',
    highlight: 'Applied Cryptography',
    keys: ['Applied Cryptography', 'Go', 'Provable Security', 'PRF/PRG'],
  },
  {
    label: 'SYSTEMS & INFRA',
    highlight: 'FastAPI',
    keys: ['FastAPI', 'AWS Lambda', 'Next.js', 'OpenTofu', 'Supabase', 'TypeScript'],
  },
]

const Skills: FC<Props> = ({ skills }) => {
  const skillNames = new Set(skills.map((s) => s.name))

  const groups = DOMAIN_GROUPS.map((group) => ({
    ...group,
    skills: group.keys.filter((k) => skillNames.has(k)),
  }))

  const claimed = new Set(DOMAIN_GROUPS.flatMap((g) => g.keys))
  const other = skills.map((s) => s.name).filter((n) => !claimed.has(n))

  return (
    <section id="skills" className="py-24 px-6 bg-ink border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            heading="Skills"
            variant="dark"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.08}>
              <div className="border-[1.5px] border-[#333333] rounded-[4px] p-6 bg-[#1a1a1a] h-full">
                <span className="block text-[10px] font-heading font-semibold uppercase tracking-[0.14em] text-muted mb-5">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((name) => {
                    const isHighlight = name === group.highlight
                    return (
                      <span
                        key={name}
                        className={`text-[12px] font-heading px-2 py-[3px] rounded-[4px] border bg-transparent ${
                          isHighlight
                            ? 'border-green-deep text-green-deep'
                            : 'border-[#444444] text-faint'
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

          {other.length > 0 && (
            <Reveal delay={groups.length * 0.08}>
              <div className="border-[1.5px] border-[#333333] rounded-[4px] p-6 bg-[#1a1a1a] h-full">
                <span className="block text-[10px] font-heading font-semibold uppercase tracking-[0.14em] text-muted mb-5">
                  OTHER
                </span>
                <div className="flex flex-wrap gap-2">
                  {other.map((name) => (
                    <span
                      key={name}
                      className="text-[12px] font-heading px-2 py-[3px] rounded-[4px] border border-[#444444] text-faint bg-transparent"
                    >
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
