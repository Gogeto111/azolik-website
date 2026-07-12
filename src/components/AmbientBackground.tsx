import { useEffect, useRef } from 'react'

const SECTION_COLORS: Record<string, string> = {
  hero: 'rgba(124,58,237,0.06)',
  problem: 'rgba(239,68,68,0.04)',
  departments: 'rgba(79,209,197,0.05)',
  workflow: 'rgba(96,165,250,0.05)',
  quote: 'rgba(124,58,237,0.08)',
  howitworks: 'rgba(52,211,153,0.04)',
  industries: 'rgba(251,146,60,0.05)',
  integrations: 'rgba(167,139,250,0.04)',
  features: 'rgba(167,139,250,0.05)',
  pricing: 'rgba(79,209,197,0.05)',
  faq: 'rgba(96,165,250,0.04)',
  cta: 'rgba(124,58,237,0.08)',
}

export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    let currentColor = SECTION_COLORS.hero

    const update = () => {
      const scrollTop = window.scrollY
      const vh = window.innerHeight
      const center = scrollTop + vh / 2

      const sections = document.querySelectorAll('section')
      let activeColor = SECTION_COLORS.hero

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect()
        const top = rect.top + scrollTop
        const bottom = top + rect.height
        if (center >= top && center < bottom) {
          const id = sec.id || 'hero'
          if (SECTION_COLORS[id]) activeColor = SECTION_COLORS[id]
        }
      })

      if (activeColor !== currentColor) {
        currentColor = activeColor
        el.style.background = `radial-gradient(ellipse at 50% 35%, ${activeColor} 0%, transparent 60%)`
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    el.style.background = `radial-gradient(ellipse at 50% 35%, ${SECTION_COLORS.hero} 0%, transparent 60%)`
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 50% 35%, ${SECTION_COLORS.hero} 0%, transparent 60%)`,
        transition: 'background 1.5s ease',
      }}
      aria-hidden="true"
    />
  )
}
