import { useState, useEffect, useRef } from 'react'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const TESTIMONIALS = [
  {
    quote: "We replaced three full-time roles with AzoliK's support and sales departments. Response time dropped from hours to seconds, and our pipeline grew 3x in the first quarter.",
    name: 'Priya Mehta',
    role: 'Founder, BrightPath Digital',
    metric: '3x pipeline growth',
  },
  {
    quote: "The marketing department alone saved us 20 hours a week on content creation. But the real win was the finance team catching duplicate charges we'd missed for months.",
    name: 'Arjun Kapoor',
    role: 'COO, NovaTech Solutions',
    metric: '20 hrs/week saved',
  },
  {
    quote: "I was skeptical about AI handling customer support, but AzoliK's agents resolve 87% of tickets without escalation. Our CSAT score actually went up.",
    name: 'Sneha Reddy',
    role: 'Head of CX, FreshCart',
    metric: '87% auto-resolution',
  },
  {
    quote: "The onboarding was shockingly fast. Within 48 hours, all six departments were live and handling real work. No engineering team needed on our end.",
    name: 'Vikram Singh',
    role: 'CEO, ScaleUp Ventures',
    metric: '48h deployment',
  },
]

export function TestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (i: number) => {
    setCurrent(i)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
  }

  const t = TESTIMONIALS[current]

  return (
    <section ref={ref} id="testimonials" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel color="rgba(167,139,250,0.9)">Testimonials</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-16 entrance-fade-down"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 52px)' }}
        >
          Trusted by teams that ship fast.
        </h2>

        <div className="relative min-h-[280px]">
          <div
            key={current}
            className="rounded-2xl p-8 lg:p-12"
            style={{
              background: 'rgba(12,14,19,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              animation: 'panel-up 0.5s var(--ease) both',
            }}
          >
            {/* Quote mark */}
            <div
              className="text-5xl font-bold mb-6 leading-none"
              style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(167,139,250,0.2)' }}
            >
              &ldquo;
            </div>

            <blockquote
              className="text-white/70 text-lg lg:text-xl leading-[1.7] mb-8"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.quote}
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(79,209,197,0.2))',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: "'Outfit', sans-serif",
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white/80 text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.name}
                  </p>
                  <p className="text-white/35 text-xs">{t.role}</p>
                </div>
              </div>

              <div
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(167,139,250,0.12)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  color: '#a78bfa',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {t.metric}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? '#a78bfa' : 'rgba(255,255,255,0.12)',
                boxShadow: i === current ? '0 0 12px rgba(167,139,250,0.4)' : 'none',
                cursor: 'none',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
