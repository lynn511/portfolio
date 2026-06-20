const ITEMS = [
  'APPLIED AI ENGINEER',
  'ML SYSTEMS',
  'CRYPTOGRAPHY',
  'SOCIAL IMPACT',
  'IEEE PUBLISHED',
  'WORKSHOP FACILITATOR',
  'AI RESEARCH',
  'OPEN SOURCE',
]

const SEP = <span className="mx-6 text-ink/40 select-none" aria-hidden="true">◆</span>

function Track() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center shrink-0">
          <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-ink">
            {item}
          </span>
          {SEP}
        </span>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-green border-y-[1.5px] border-ink/10 py-3.5">
      {/* Track is duplicated so translateX(-50%) lands on the same visual position — seamless loop */}
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] will-change-transform">
        <Track />
        <Track />
      </div>
    </div>
  )
}
