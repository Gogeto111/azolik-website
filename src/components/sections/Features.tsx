import { useRef } from 'react'
import { FEATURES } from '../../data'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`
    el.style.transition = 'transform 0.08s ease'
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl p-7 group holo-card entrance-fade-up"
      style={{
        background: 'rgba(12,14,19,0.7)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'border-color 0.3s ease',
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${feature.hex}44`
      }}
      onMouseLeaveCapture={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${feature.hex}10 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: `${feature.hex}14`,
            border: `1px solid ${feature.hex}28`,
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: feature.hex,
              boxShadow: `0 0 12px ${feature.hex}55`,
            }}
          />
        </div>

        <h3
          className="font-semibold text-white text-lg mb-2.5"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {feature.title}
        </h3>
        <p className="text-white/40 text-sm leading-[1.7]">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="features" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel color="rgba(167,139,250,0.9)">Why AzoliK</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-4 entrance-fade-down"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 56px)' }}
        >
          Built for the exhausted founder
        </h2>
        <p className="text-center text-white/35 max-w-lg mx-auto mb-14 leading-[1.65] entrance-fade-up">
          Six reasons your AI workforce outperforms the alternative.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}