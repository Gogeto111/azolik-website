import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'services', label: 'Services' },
  { id: 'departments', label: 'Departments' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'industries', label: 'Industries' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faqs', label: 'FAQ' },
  { id: 'cta', label: 'Contact' },
]

export function ScrollSpy() {
  const [active, setActive] = useState('home')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > 400)

      let current = 'home'
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.id
          }
        }
      }
      setActive(current)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 hidden xl:flex transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center gap-3 justify-end"
          aria-label={section.label}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span
            className="text-[10px] tracking-wider uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.5)' }}
          >
            {section.label}
          </span>
          <div
            className="relative w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: active === section.id ? '#a78bfa' : 'rgba(255,255,255,0.15)',
              boxShadow: active === section.id ? '0 0 12px rgba(167,139,250,0.5)' : 'none',
              transform: active === section.id ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        </a>
      ))}
    </nav>
  )
}
