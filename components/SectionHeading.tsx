interface Props {
  /** Short uppercase eyebrow label */
  eyebrow: string
  heading: string
  sub?: string
  /** Numeric index shown to the right, e.g. "01" */
  index?: string
}

export default function SectionHeader({ eyebrow, heading, sub, index }: Props) {
  return (
    <header className="mb-14 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-green" />
          <span className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-green-deep">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-heading font-semibold uppercase text-[clamp(28px,3.5vw,44px)] tracking-[-0.04em] leading-[0.95] text-ink">
          {heading}
        </h2>
        {sub && (
          <p className="text-[14px] text-muted mt-3 leading-relaxed">{sub}</p>
        )}
      </div>
      {index && (
        <span className="text-[11px] font-heading font-semibold tracking-[0.12em] text-faint shrink-0 mt-1">
          {index}
        </span>
      )}
    </header>
  )
}
