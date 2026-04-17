interface Props {
  eyebrow: string
  heading: string
  sub?: string
}

export default function SectionHeading({ eyebrow, heading, sub }: Props) {
  return (
    <header className="mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[2px] w-7 bg-brand-orange" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-heading font-black text-[clamp(32px,4vw,52px)] tracking-[-0.03em] text-gray-900 dark:text-white inline-block border-b-4 border-brand-orange pb-1">
        {heading}
      </h2>
      {sub && (
        <p className="text-[15px] text-gray-500 dark:text-blue-200 mt-3">{sub}</p>
      )}
    </header>
  )
}
