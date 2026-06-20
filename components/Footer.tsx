import type { FC } from 'react'

interface Social {
  name: string
  link: string
}

interface Props {
  displayName: string
  socials: Social[]
}

const Footer: FC<Props> = ({ displayName, socials }) => {
  const year = new Date().getFullYear()
  const footerLinks = socials.filter((s) =>
    ['Github', 'LinkedIn', 'Medium', 'Gmail'].includes(s.name)
  )

  return (
    <footer className="bg-ink border-t border-paper/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <p className="font-heading font-semibold text-[14px] tracking-[-0.02em] text-paper/80">
          lynn<span className="text-green">/</span>el moussaoui
          <span className="ml-3 text-faint font-normal text-[12px]">© {year}</span>
        </p>

        {/* Social links */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-6 gap-y-2">
          {footerLinks.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target={s.link.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="green-sweep text-[12px] font-heading font-medium text-paper/50 hover:text-paper transition-colors duration-200 ease-brand py-1 focus-ring"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
