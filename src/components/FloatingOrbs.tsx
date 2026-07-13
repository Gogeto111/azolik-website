import { useRef, useEffect } from 'react'

export function FloatingOrbs() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false

    const update = () => {
      const sy = window.scrollY
      const orbs = el.querySelectorAll<HTMLElement>('[data-orb]')
      orbs.forEach((orb, i) => {
        const speed = 0.015 + i * 0.008
        const yOff = Math.sin(sy * speed + i * 1.5) * 20
        const xOff = Math.cos(sy * speed * 0.7 + i) * 10
        orb.style.transform = `translate3d(${xOff}px, ${yOff}px, 0)`
      })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className="relative h-0 pointer-events-none overflow-visible" aria-hidden="true">
      {/* Left cluster */}
      <div data-orb className="absolute will-change-transform" style={{ left: '5%', top: '-60px' }}>
        <div
          className="animate-orb-1 animate-morph"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: 'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.12), rgba(124,58,237,0.03))',
            border: '1px solid rgba(124,58,237,0.1)',
            filter: 'blur(0.5px)',
          }}
        />
      </div>
      <div data-orb className="absolute will-change-transform" style={{ left: '8%', top: '-20px' }}>
        <div
          className="animate-orb-2 animate-morph"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(79,209,197,0.1), rgba(79,209,197,0.02))',
            border: '1px solid rgba(79,209,197,0.08)',
            animationDelay: '-2s',
          }}
        />
      </div>

      {/* Right cluster */}
      <div data-orb className="absolute will-change-transform" style={{ right: '6%', top: '-80px' }}>
        <div
          className="animate-orb-3 animate-morph"
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
            background: 'radial-gradient(circle at 60% 40%, rgba(251,146,60,0.1), rgba(251,146,60,0.02))',
            border: '1px solid rgba(251,146,60,0.08)',
            animationDelay: '-4s',
          }}
        />
      </div>
      <div data-orb className="absolute will-change-transform" style={{ right: '12%', top: '-30px' }}>
        <div
          className="animate-orb-1 animate-morph"
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.1), rgba(96,165,250,0.02))',
            border: '1px solid rgba(96,165,250,0.08)',
            animationDelay: '-6s',
          }}
        />
      </div>
    </div>
  )
}
