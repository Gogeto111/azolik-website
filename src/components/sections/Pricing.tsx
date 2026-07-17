import { useRef, useState } from 'react'
import { PRICING } from '../../data'
import { CheckMark, SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { AIProductsSection } from './AIProducts'

function PricingCard({ plan, annual, style }: { plan: typeof PRICING[0]; annual: boolean; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`
    el.style.transition = 'transform 0.08s ease'
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'transform 0.6s var(--ease)'
  }

  const displayPrice = annual ? plan.annual : plan.monthly

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl p-px entrance-scale-up"
      style={{
        background: plan.highlighted
          ? 'linear-gradient(140deg, rgba(124,58,237,0.7), rgba(14,165,233,0.55))'
          : 'rgba(255,255,255,0.07)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {plan.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap z-10"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
        >
          {plan.badge}
        </div>
      )}
      <div
        className="h-full rounded-2xl p-7 flex flex-col holo-card card-glow"
        style={{ background: plan.highlighted ? 'rgba(10,8,24,0.98)' : '#0c0e13', ['--glow-color' as string]: plan.highlighted ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.06)' }}
      >
        <div className="mb-6 entrance-fade-up">
          <h3 className="font-bold text-white text-2xl mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {plan.name}
          </h3>
          <p className="text-white/38 text-sm">{plan.description}</p>
        </div>

        <div className="mb-8 entrance-fade-up" style={{ animationDelay: '80ms' }}>
          {plan.monthly !== null ? (
            <>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-bold text-white"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(40px, 5vw, 52px)' }}
                >
                   ${displayPrice}
                </span>
                <span className="text-white/30 text-sm">/{annual ? 'yr' : 'mo'}</span>
              </div>
              {annual && plan.annual && (
                <p className="text-white/22 text-xs mt-1">
                  ≈ ${Math.round(plan.annual / 12)}/mo · Save ${plan.monthly * 12 - (plan.annual || 0)}/yr
                </p>
              )}
            </>
          ) : (
            <span className="font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '40px' }}>
              Custom
            </span>
          )}
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((f, i) => (
            <li key={f} className="flex items-start gap-3 entrance-fade-right" style={{ animationDelay: `${i * 60}ms` }}>
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: plan.highlighted ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.07)' }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                  <path d="M1.5 4.5L3.8 7L7.5 2.5" stroke={plan.highlighted ? '#c4b5fd' : 'rgba(255,255,255,0.45)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-white/52 text-sm leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="w-full block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] btn-press ripple entrance-scale-up"
          style={
            plan.highlighted
              ? { background: '#f5f5f7', color: '#08090c' }
              : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.09)' }
          }
        >
          {plan.cta}
        </a>
      </div>
    </div>
  )
}

export function PricingSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [annual, setAnnual] = useState(true)

  return (
    <section ref={ref} id="pricing" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel color="rgba(79,209,197,0.9)">Pricing</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-10 entrance-fade-down"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 60px)' }}
        >
          A full team. A fraction of the cost.
        </h2>

        <div className="flex justify-center mb-14 entrance-fade-up">
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { label: 'Monthly', value: false, note: null as string | null },
              { label: 'Annual', value: true, note: 'Save 25%' },
            ].map(({ label, value, note }) => (
              <button
                key={label}
                onClick={() => setAnnual(value)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 btn-press"
                style={{
                  background: annual === value ? 'rgba(255,255,255,0.09)' : 'transparent',
                  color: annual === value ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.38)',
                  cursor: 'none',
                }}
              >
                {label}
                {note && (
                  <span
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}
                  >
                    {note}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PRICING.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} annual={annual} style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>

        <p className="text-center text-white/22 text-sm mt-8 entrance-fade-up">
          Solo plan: 6 months free. Team plan: 14-day free trial. · No credit card required · Cancel anytime
        </p>

        <AIProductsSection />
      </div>
    </section>
  )
}