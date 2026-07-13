import { useRef, useState, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useCountUp } from '../../hooks/useCountUp'
import { STATS } from '../../data'

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(visible ? parseInt(stat.value.replace(/[^\d]/g, '')) : 0, 1800 + index * 200)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isPercentage = stat.value.includes('%')
  const isPlus = stat.value.includes('+')

  return (
    <div
      ref={ref}
      className="relative text-center p-8 rounded-2xl group holo-card entrance-scale-up"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.4s ease, background 0.4s ease',
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'
        e.currentTarget.style.background = 'rgba(167,139,250,0.05)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.12) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <div
          className="font-bold text-white mb-2"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(40px, 5vw, 56px)',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #a78bfa, #a78bfa99)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count}{isPlus ? '+' : ''}{isPercentage ? '%' : ''}
        </div>
        <p
          className="text-white/40 text-sm tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {stat.label}
        </p>
      </div>
    </div>
  )
}

export function StatsSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="stats" className="reveal relative z-10 py-24 px-6" style={{ background: '#08090c' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}