'use client'
import Link from 'next/link'
import { useTheme } from '@/hooks/useTheme'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#blog', label: 'Blog' },
  { href: '#contributions', label: 'Contributions' },
  { href: '#about', label: 'About' },
]

export default function Nav() {
  const { isDark, toggle, mounted } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-white/80 dark:bg-brand-blue/80 border-b border-gray-200/30 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-xl font-black tracking-[-0.03em] text-gray-900 dark:text-white"
        >
          lynn.el moussaoui
        </Link>

        <div className="flex items-center gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-600 dark:text-blue-100 hover:text-brand-orange dark:hover:text-brand-orange transition-colors hidden md:block"
            >
              {l.label}
            </Link>
          ))}

          {/* Ghost CV button */}
          <a
            href="/lynn-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors font-medium"
          >
            <span className="text-xs leading-none">↓</span>
            CV
          </a>

          {/* Dark mode pill */}
          {mounted && (
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-white/10 transition-colors flex items-center px-1"
            >
              <span
                className={`absolute w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${
                  isDark
                    ? 'translate-x-7 bg-brand-orange shadow-sm'
                    : 'translate-x-0 bg-white shadow-sm'
                }`}
              >
                {isDark ? '🌙' : '☀'}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
