'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const phrases = [
  'AI engineer.',
  'researcher.',
  'workshop facilitator.',
  'writer.',
  'problem solver.',
]

function formatLogoName(name: string) {
  const parts = name.toLowerCase().split(' ')
  return parts[0] + '.' + parts.slice(1).join(' ')
}

export default function Hero({ name, role }: { name: string; role: string }) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx((i) => i + 1)
      }, 90)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((i) => i - 1)
      }, 55)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
      {/* Eyebrow */}
      <p className="mb-6 text-xs font-medium tracking-[0.15em] uppercase text-gray-500 dark:text-white/90 leading-relaxed">
        {role} · Software · Mathematics · Research · Workshops · Writing
      </p>

      {/* Headline */}
      <h1 className="font-heading font-black text-[clamp(2.5rem,12vw,12rem)] leading-none tracking-[-0.03em] text-gray-900 dark:text-white mb-6 select-none">
        {formatLogoName(name)}
      </h1>

      {/* Subtitle */}
      <p className="text-[clamp(1rem,5vw,1.5rem)] font-light text-gray-500 dark:text-blue-100 mb-4 tracking-wide">
        builder.&nbsp;thinker.{' '}
        <span className="text-brand-blue dark:text-blue-300 font-medium">explorer.</span>
      </p>

      {/* Typing animation */}
      <div className="h-9 mb-10 flex items-center gap-2 text-[clamp(0.9rem,3vw,1.125rem)] text-gray-500 dark:text-blue-200">
        <span className="text-brand-orange font-medium">→</span>
        <span className="font-medium text-gray-700 dark:text-white min-w-[160px] sm:min-w-[220px] text-left">
          {displayed}
          <span className="animate-blink text-brand-orange">|</span>
        </span>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full px-4 sm:px-0">
        <Link
          href="#work"
          className="w-full sm:w-auto text-center px-7 py-3 rounded-full bg-brand-orange text-white font-medium hover:bg-[#b8480a] transition-colors"
        >
          See my work
        </Link>
        <Link
          href="https://medium.com/@lynnelmoussaoui"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-7 py-3 rounded-full border-2 border-brand-blue text-brand-blue dark:text-blue-200 dark:border-blue-300 font-medium hover:bg-brand-blue hover:text-white transition-colors"
        >
          Read the blog
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-2 absolute bottom-10 left-1/2 -translate-x-1/2">
        <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400 dark:text-blue-300">
          Scroll
        </span>
        <div className="relative w-px h-14 bg-gray-200 dark:bg-white/20 overflow-hidden">
          <div className="absolute inset-x-0 h-1/3 bg-brand-orange animate-scanDown" />
        </div>
      </div>
    </section>
  )
}
