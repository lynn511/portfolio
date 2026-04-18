'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#work', label: 'Work' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#blog', label: 'Blog' },
  { href: '#contributions', label: 'Contributions' },
]

export default function Nav() {
  const { isDark, toggle, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-white/95 dark:bg-[#0c2f4a] border-b border-gray-200/40 dark:border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-xl font-black tracking-[-0.03em] text-gray-900 dark:text-white shrink-0"
        >
          lynn.el moussaoui
        </Link>

        <div className="flex items-center gap-1 md:gap-2 lg:gap-4 xl:gap-5">
          {/* Desktop links — visible from 768 px, compact text until 1024 px */}
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden md:block text-xs lg:text-sm whitespace-nowrap text-gray-600 dark:text-blue-100 hover:text-brand-orange dark:hover:text-brand-orange transition-colors px-1 py-3"
            >
              {l.label}
            </Link>
          ))}

          {/* CV button — lg+ only to avoid crowding at 768 px */}
          <a
            href="/lynn-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded border-[1.5px] border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
          >
            <span className="text-xs leading-none">↓</span>
            CV
          </a>

          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-white/10 transition-colors flex items-center px-1 shrink-0"
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

          {/* Hamburger — visible below 768 px, min 44×44 tap target */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex flex-col justify-center items-center min-w-[44px] min-h-[44px] gap-[5px] shrink-0"
          >
            <span
              className={`block w-6 h-[3px] bg-gray-800 dark:bg-white rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[3px] bg-gray-800 dark:bg-white rounded-full transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[3px] bg-gray-800 dark:bg-white rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer — slides down below 768 px */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-4 border-t border-gray-200/30 dark:border-white/10 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-700 dark:text-blue-100 hover:text-brand-orange dark:hover:text-brand-orange transition-colors py-3 border-b border-gray-100/50 dark:border-white/5 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/lynn-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-4 py-3 mt-2 text-sm font-medium rounded border-[1.5px] border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors w-fit"
          >
            <span className="text-xs leading-none">↓</span>
            Download CV
          </a>
        </div>
      </div>
    </nav>
  )
}
