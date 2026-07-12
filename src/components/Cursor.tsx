import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let hovering = false
    let color = 'rgba(255,255,255,0.9)'
    let raf: number

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) setVisible(true)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return

      const card = el.closest('[data-dept-color]') as HTMLElement | null
      const interactive = el.closest('a, button, [role="button"]')

      if (card) {
        const c = card.dataset.deptColor ?? 'rgba(255,255,255,0.9)'
        if (c !== color) {
          color = c
          hovering = true
          if (ringRef.current) {
            ringRef.current.style.borderColor = color
            ringRef.current.style.width = '52px'
            ringRef.current.style.height = '52px'
            ringRef.current.style.opacity = '0.5'
          }
          if (dotRef.current) dotRef.current.style.background = color
          if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle, ${color}40 0%, transparent 70%)`
            glowRef.current.style.width = '80px'
            glowRef.current.style.height = '80px'
          }
        }
      } else if (interactive) {
        if (!hovering || color !== 'rgba(255,255,255,1)') {
          hovering = true
          color = 'rgba(255,255,255,1)'
          if (ringRef.current) {
            ringRef.current.style.borderColor = color
            ringRef.current.style.width = '52px'
            ringRef.current.style.height = '52px'
            ringRef.current.style.opacity = '0.4'
          }
          if (dotRef.current) dotRef.current.style.background = color
          if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle, ${color}30 0%, transparent 70%)`
            glowRef.current.style.width = '80px'
            glowRef.current.style.height = '80px'
          }
        }
      } else {
        if (hovering) {
          hovering = false
          color = 'rgba(255,255,255,0.9)'
          if (ringRef.current) {
            ringRef.current.style.borderColor = color
            ringRef.current.style.width = '28px'
            ringRef.current.style.height = '28px'
            ringRef.current.style.opacity = '0.7'
          }
          if (dotRef.current) dotRef.current.style.background = color
          if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle, ${color}20 0%, transparent 70%)`
            glowRef.current.style.width = '50px'
            glowRef.current.style.height = '50px'
          }
        }
      }
    }

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.18)
      current.y = lerp(current.y, target.y, 0.18)
      const dotTx = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
      const ringTx = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
      const glowTx = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
      if (dotRef.current) dotRef.current.style.transform = dotTx
      if (ringRef.current) ringRef.current.style.transform = ringTx
      if (glowRef.current) glowRef.current.style.transform = glowTx
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  if (!visible) return null

  return (
    <>
      {/* Glow halo */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9996] rounded-full"
        style={{
          left: 0, top: 0,
          width: 50, height: 50,
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          transition: 'width 0.25s var(--ease), height 0.25s var(--ease), background 0.3s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] rounded-full border-2"
        style={{
          left: 0, top: 0,
          width: 28, height: 28,
          borderColor: 'rgba(255,255,255,0.9)',
          opacity: 0.7,
          transition: 'width 0.25s var(--ease), height 0.25s var(--ease), border-color 0.3s ease, opacity 0.25s ease',
          willChange: 'transform',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          left: 0, top: 0,
          width: 7, height: 7,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 0 8px rgba(255,255,255,0.5)',
          transition: 'background 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
