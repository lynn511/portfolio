'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-ink text-paper transition-all duration-300 ease-brand ${
        scrolled ? 'border-b border-hairline/20 py-0' : 'py-0'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ease-brand ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="font-heading font-semibold text-[15px] tracking-[-0.02em] text-paper shrink-0 focus-ring"
        >
          lynn<span className="text-green">/</span>el moussaoui
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="green-sweep px-2 py-1 text-[11px] font-heading font-semibold uppercase tracking-[0.12em] text-paper/70 hover:text-paper transition-colors duration-200 focus-ring"
            >
              {l.label}
            </Link>
          ))}

          <a
            href="/lynn-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-green text-ink text-[11px] font-heading font-semibold uppercase tracking-[0.1em] hover:bg-green-deep transition-colors duration-200 active:scale-95 focus-ring"
          >
            <span className="text-[10px] leading-none">↓</span>
            CV
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden inline-flex flex-col justify-center items-center min-w-[44px] min-h-[44px] gap-[5px] shrink-0 focus-ring"
        >
          <span
            className={`block w-5 h-[2px] bg-paper transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-paper transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-paper transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-brand ${
          menuOpen ? 'max-h-[520px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 border-t border-paper/10 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[12px] font-heading font-semibold uppercase tracking-[0.12em] text-paper/70 hover:text-paper transition-colors py-3.5 border-b border-paper/10 last:border-0 focus-ring"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/lynn-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 mt-4 rounded-[4px] bg-green text-ink text-[11px] font-heading font-semibold uppercase tracking-[0.1em] w-fit hover:bg-green-deep transition-colors focus-ring"
          >
            <span className="text-[10px] leading-none">↓</span>
            Download CV
          </a>
        </div>
      </div>
    </nav>
  )
}
