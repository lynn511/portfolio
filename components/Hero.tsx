'use client'
import {
  useReducedMotion,
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'motion/react'

const HEADLINE = ['BUILT', 'FOR', 'IMPACT']
const ease: [number, number, number, number] = [0.2, 0.7, 0.2, 1]

export default function Hero({ role }: { name: string; role: string }) {
  const reduced = useReducedMotion()

  // Mouse parallax — normalised [-0.5, 0.5] relative to section bounds
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 50, damping: 25 })
  const springY = useSpring(rawY, { stiffness: 50, damping: 25 })

  const noRange: [number, number] = [0, 0]
  const b1x = useTransform(springX, [-0.5, 0.5], reduced ? noRange : [-12, 12])
  const b1y = useTransform(springY, [-0.5, 0.5], reduced ? noRange : [-7, 7])
  const b2x = useTransform(springX, [-0.5, 0.5], reduced ? noRange : [7, -7])
  const b2y = useTransform(springY, [-0.5, 0.5], reduced ? noRange : [4, -4])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-paper"
      onMouseMove={handleMouseMove}
    >
      {/* Section index — top right */}
      <span className="absolute top-24 right-8 text-[11px] font-heading font-semibold tracking-[0.12em] text-faint z-10 hidden sm:block select-none">
        01 / 07
      </span>

      {/* ── Diagonal decorative blocks ── */}

      {/* Block 1 — large green, entrance from right */}
      <motion.div
        className="absolute top-[-20%] right-[-14%] md:right-[-8%]"
        initial={{ x: reduced ? 0 : '130%', opacity: reduced ? 1 : 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.75, delay: reduced ? 0 : 0.45, ease }}
      >
        <motion.div
          className="w-[220px] h-[400px] md:w-[320px] md:h-[560px] rotate-[18deg] bg-green"
          style={{ x: b1x, y: b1y }}
        />
      </motion.div>

      {/* Block 2 — ink, offset, entrance from right */}
      <motion.div
        className="absolute top-[8%] right-[-22%] md:right-[-16%]"
        initial={{ x: reduced ? 0 : '130%', opacity: reduced ? 1 : 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.75, delay: reduced ? 0 : 0.55, ease }}
      >
        <motion.div
          className="w-[180px] h-[320px] md:w-[260px] md:h-[440px] rotate-[-12deg] bg-ink"
          style={{ x: b2x, y: b2y }}
        />
      </motion.div>

      {/* Block 3 — small green, lower-left accent */}
      <motion.div
        className="absolute bottom-[10%] left-[-2%] w-[60px] h-[110px] md:w-[80px] md:h-[140px] bg-green rotate-[18deg]"
        initial={{ opacity: 0, x: reduced ? 0 : -20 }}
        animate={{ opacity: 0.55, x: 0 }}
        transition={{ duration: 0.6, delay: reduced ? 0 : 0.6, ease }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 pt-36 pb-28">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            className="h-px bg-green-deep origin-left"
            style={{ width: 24 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : 0, ease }}
          />
          <motion.span
            className="text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-green-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: reduced ? 0 : 0.2, ease }}
          >
            {role}
          </motion.span>
        </div>

        {/* Headline — words rise from overflow masks */}
        <h1
          className="font-heading font-semibold uppercase leading-[0.88] tracking-[-0.05em] text-[clamp(52px,9vw,116px)] text-ink mb-8 select-none"
          aria-label={HEADLINE.join(' ')}
        >
          {HEADLINE.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: reduced ? 0 : '105%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: reduced ? 0.01 : 0.65,
                  delay: reduced ? 0 : 0.28 + i * 0.09,
                  ease,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub-band */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.65, ease }}
        >
          <span className="inline-block px-4 py-2 rounded-[4px] bg-ink text-paper text-[11px] font-heading font-semibold uppercase tracking-[0.14em]">
            ML SYSTEMS · CRYPTO · SOCIAL IMPACT
          </span>
        </motion.div>
      </div>

      {/* Scroll cue — bottom left */}
      <div className="absolute bottom-8 left-6 md:left-12 flex items-center gap-2 z-10">
        <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-faint select-none">
          scroll
        </span>
        <span className="text-[10px] text-faint animate-bob inline-block" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  )
}
