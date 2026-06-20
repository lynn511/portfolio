interface Props {
  /** Short uppercase eyebrow label */
  eyebrow: string
  heading: string
  sub?: string
  variant?: 'light' | 'dark'
}

export default function SectionHeader({ eyebrow, heading, sub, variant = 'light' }: Props) {
  const dark = variant === 'dark'
  return (
    <header className="mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-6 bg-green" />
        <span className={`text-[11px] font-heading font-semibold uppercase tracking-[0.16em] ${dark ? 'text-green' : 'text-green-deep'}`}>
          {eyebrow}
        </span>
      </div>
      <h2 className={`font-heading font-semibold uppercase text-[clamp(28px,3.5vw,44px)] tracking-[-0.04em] leading-[0.95] ${dark ? 'text-paper' : 'text-ink'}`}>
        {heading}
      </h2>
      {sub && (
        <p className={`text-[14px] mt-3 leading-relaxed ${dark ? 'text-faint' : 'text-muted'}`}>{sub}</p>
      )}
    </header>
  )
}
