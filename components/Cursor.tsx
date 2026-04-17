'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      animId = requestAnimationFrame(animate)
    }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [data-hover]')) {
        dot.style.transform += ' scale(2.5)'
        dot.style.opacity = '0.8'
        ring.style.width = '52px'
        ring.style.height = '52px'
        ring.style.marginLeft = '-26px'
        ring.style.marginTop = '-26px'
      }
    }

    const onLeave = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [data-hover]')) {
        dot.style.opacity = '1'
        ring.style.width = '40px'
        ring.style.height = '40px'
        ring.style.marginLeft = '0'
        ring.style.marginTop = '0'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    animId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{ position: 'fixed', top: 0, left: 0, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#D35400', pointerEvents: 'none', zIndex: 99999, transition: 'opacity 0.15s' }}
      />
      <div
        ref={ringRef}
        style={{ position: 'fixed', top: 0, left: 0, width: 40, height: 40, borderRadius: '50%', border: '2px solid #135480', pointerEvents: 'none', zIndex: 99998, transition: 'width 0.25s, height 0.25s' }}
      />
    </>
  )
}
