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
    <footer className="py-10 px-6 border-t border-gray-100 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 dark:text-blue-300">
          © {year} {displayName}
        </p>

        <div className="flex items-center gap-6">
          {footerLinks.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target={s.link.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-blue-200 hover:text-brand-orange transition-colors"
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
