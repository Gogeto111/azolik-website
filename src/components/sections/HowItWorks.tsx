import { TIMELINE_STEPS } from '../../data'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useParallax } from '../../hooks/useParallax'
import { ScrollRevealText } from '../ScrollRevealText'

function TimelineItem({ step, i }: { step: (typeof TIMELINE_STEPS)[0]; i: number }) {
  const ref = useParallax<HTMLDivElement>((i + 1) * 0.04)

  return (
    <div ref={ref} className="flex gap-8 items-start group" style={{ willChange: 'transform' }}>
      <div
        className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-105"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          background:
            i === 0
              ? 'linear-gradient(135deg, rgba(124,58,237,0.45), rgba(14,165,233,0.45))'
              : 'rgba(255,255,255,0.04)',
          border: `1px solid ${i === 0 ? 'rgba(124,58,237,0.45)' : 'rgba(255,255,255,0.07)'}`,
          color: i === 0 ? '#c4b5fd' : 'rgba(255,255,255,0.25)',
        }}
      >
        {step.num}
      </div>
      <div className="pt-3.5">
        <h3 className="font-semibold text-white text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {step.title}
        </h3>
        <p className="text-white/40 leading-[1.65] text-sm max-w-sm">{step.body}</p>
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="howitworks" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel color="rgba(96,165,250,0.9)">How it works</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-20"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 56px)' }}
        >
          <ScrollRevealText>Up and running in 48 hours.</ScrollRevealText>
          <span className="block mt-3 text-white/22 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            (That's faster than your last hire finished their onboarding paperwork.)
          </span>
        </h2>

        <div className="relative perspective-scene">
          {/* Vertical line on desktop */}
          <div
            className="absolute hidden md:block"
            style={{
              left: '27px',
              top: '28px',
              bottom: '28px',
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(124,58,237,0.55), rgba(14,165,233,0.25), transparent)',
            }}
          />
          <div className="space-y-10">
            {TIMELINE_STEPS.map((step, i) => (
              <TimelineItem key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
