import { useState, useRef } from 'react'
import { INDUSTRIES } from '../../data'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function IndustriesSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [active, setActive] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const onCardMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`
    el.style.transition = 'transform 0.1s ease'
  }

  const onCardLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'transform 0.6s var(--ease)'
  }

  return (
    <section ref={ref} id="industries" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel color="rgba(251,146,60,0.9)">Industries</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-14"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 56px)' }}
        >
          Built for your industry.
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {INDUSTRIES.map((ind, i) => (
            <button
              key={ind.name}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: active === i ? 'rgba(251,146,60,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active === i ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.07)'}`,
                color: active === i ? '#fb923c' : 'rgba(255,255,255,0.42)',
              }}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          ref={cardRef}
          className="relative rounded-2xl p-px"
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(167,139,250,0.2), rgba(79,209,197,0.15))',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
        >
          <div
            className="rounded-2xl px-10 py-12 text-center"
            style={{ background: '#0c0e13' }}
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: 'rgba(251,146,60,0.1)',
                border: '1px solid rgba(251,146,60,0.25)',
                color: '#fb923c',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {INDUSTRIES[active].name}
            </div>
            <p
              className="text-white/62 leading-[1.75] max-w-2xl mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(16px, 2.2vw, 20px)' }}
            >
              {INDUSTRIES[active].text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
