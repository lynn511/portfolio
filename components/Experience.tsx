import type { FC } from 'react'

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

interface Props {
  experience: ExperienceEntry[]
}

function fmtDate(d: string): string {
  if (d === 'Present') return 'Present'
  const [y, m] = d.split('-').map(Number)
  return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function splitLastWord(text: string): [string, string] {
  const words = text.split(' ')
  const last = words.pop() ?? ''
  return [words.join(' '), last]
}

const Experience: FC<Props> = ({ experience }) => {
  const current = experience.filter((e) => e.endDate === 'Present')
  const previous = experience.filter((e) => e.endDate !== 'Present')
  const [primary, secondary] = current
  const [positionLead, positionLast] = primary ? splitLastWord(primary.position) : ['', '']

  return (
    <section id="experience" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-[10px]" style={{ gap: 6 }}>
          <div style={{ width: 24, height: 2, background: '#00C24A', flexShrink: 0 }} />
          <span
            className="font-heading font-bold uppercase"
            style={{ fontSize: 10, letterSpacing: '0.14em', color: '#00A03D' }}
          >
            CAREER
          </span>
        </div>
        <h2
          className="font-heading uppercase"
          style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: '#0a0a0a', marginBottom: 20 }}
        >
          EXPERIENCE
        </h2>

        {primary && (
          <div
            className="relative overflow-hidden"
            style={{ background: '#0a0a0a', borderRadius: 4, padding: 28, marginBottom: 10 }}
          >
            <div
              style={{
                position: 'absolute',
                right: -30,
                top: -30,
                width: 120,
                height: 120,
                background: '#00C24A',
                transform: 'rotate(18deg)',
                opacity: 0.1,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 20,
                bottom: -40,
                width: 80,
                height: 80,
                background: '#00C24A',
                transform: 'rotate(18deg)',
                opacity: 0.06,
                pointerEvents: 'none',
              }}
            />
            <div
              className="inline-flex items-center"
              style={{ gap: 6, border: '1px solid #00C24A', borderRadius: 3, padding: '3px 8px', marginBottom: 16 }}
            >
              <span
                className="animate-livePulse inline-block flex-shrink-0"
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#00C24A' }}
              />
              <span
                className="font-heading font-bold uppercase"
                style={{ fontSize: 9, letterSpacing: '0.14em', color: '#00C24A' }}
              >
                Current · {fmtDate(primary.startDate)} – Present
              </span>
            </div>
            <p
              className="font-heading font-bold uppercase"
              style={{ fontSize: 11, letterSpacing: '0.12em', color: '#9a9a9a', marginBottom: 8 }}
            >
              {primary.company} · {primary.location}
            </p>
            <p
              className="font-heading uppercase"
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: '-0.05em',
                color: '#fff',
                lineHeight: 0.9,
                marginBottom: 14,
              }}
            >
              {positionLead} <span style={{ color: '#00C24A' }}>{positionLast}</span>
            </p>
            <p style={{ fontSize: 12, color: '#666666', lineHeight: 1.65, maxWidth: 420 }}>
              {primary.description[0]}
            </p>
          </div>
        )}

        {secondary && (
          <div
            className="grid grid-cols-[1fr_auto] items-center"
            style={{ background: '#0a0a0a', borderRadius: 4, padding: '18px 24px', marginBottom: 10, gap: 16 }}
          >
            <div>
              <div className="inline-flex items-center" style={{ gap: 6, marginBottom: 6 }}>
                <span
                  className="animate-livePulse inline-block flex-shrink-0"
                  style={{ width: 5, height: 5, borderRadius: '50%', background: '#00C24A' }}
                />
                <span
                  className="font-heading font-bold uppercase"
                  style={{ fontSize: 9, letterSpacing: '0.12em', color: '#00C24A' }}
                >
                  Current
                </span>
              </div>
              <p
                className="font-heading font-bold uppercase"
                style={{ fontSize: 11, letterSpacing: '0.1em', color: '#9a9a9a', marginBottom: 4 }}
              >
                {secondary.company} · {secondary.location}
              </p>
              <p
                className="font-heading uppercase"
                style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}
              >
                {secondary.position}
              </p>
            </div>
            <div
              className="font-heading"
              style={{ fontSize: 10, color: '#444444', textAlign: 'right', whiteSpace: 'nowrap' }}
            >
              {fmtDate(secondary.startDate)}
              <br />— Present
            </div>
          </div>
        )}

        {previous.length > 0 && (
          <>
            <p
              className="font-heading font-bold uppercase"
              style={{ fontSize: 9, letterSpacing: '0.14em', color: '#9a9a9a', marginTop: 20, marginBottom: 10 }}
            >
              Previously
            </p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
              {previous.map((entry) => (
                <div key={entry.id} style={{ border: '1px solid #e6e6e6', borderRadius: 4, padding: '12px 14px' }}>
                  <p
                    className="font-heading font-bold uppercase"
                    style={{ fontSize: 9, letterSpacing: '0.1em', color: '#9a9a9a', marginBottom: 4 }}
                  >
                    {entry.company} · {entry.location}
                  </p>
                  <p
                    className="font-heading uppercase"
                    style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em', color: '#0a0a0a', lineHeight: 1.1 }}
                  >
                    {entry.position}
                  </p>
                  <p style={{ fontSize: 10, color: '#bbbbbb', marginTop: 5 }}>
                    {fmtDate(entry.startDate)} – {fmtDate(entry.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Experience
