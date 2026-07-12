import { Clock, Zap, Filter, Plug, TrendingUp, MessageCircle } from 'lucide-react'
import { useRef } from 'react'
import { FEATURES } from '../../data'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  'always-on': Clock,
  'ready-fast': Zap,
  'smart-escalation': Filter,
  'your-stack': Plug,
  'gets-smarter': TrendingUp,
  'no-engineers': MessageCircle,
}

function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = ICONS[feature.id] ?? Zap

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) scale3d(1.02, 1.02, 1.02)`
    el.style.transition = 'transform 0.08s ease'
    el.style.borderColor = `${feature.hex}35`
    el.style.boxShadow = `0 0 40px ${feature.hex}10, inset 0 1px 0 rgba(255,255,255,0.06)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'transform 0.6s var(--ease)'
    el.style.borderColor = 'rgba(255,255,255,0.08)'
    el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-dept-color={feature.hex}
      className="card-3d rounded-2xl p-7 flex flex-col gap-5 transition-colors duration-300 group"
      style={{
        background: 'rgba(12,14,19,0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${feature.hex}18`, color: feature.hex }}
      >
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <div>
        <h3
          className="font-semibold text-white text-lg mb-2 leading-snug"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {feature.title}
        </h3>
        <p className="text-white/42 text-sm leading-[1.7]">{feature.description}</p>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const ref = useScrollReveal<HTMLElement>()
  const grid = useScrollReveal<HTMLDivElement>()

  return (
    <section ref={ref} id="features" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel color="rgba(167,139,250,0.9)">What makes AzoliK different</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-4"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)' }}
        >
          Built for how real businesses work.
        </h2>
        <p className="text-center text-white/35 max-w-lg mx-auto mb-14 leading-[1.65]">
          Not a chatbot. Not a template library. A full AI workforce that handles the work
          autonomously and gets out of your way.
        </p>

        <div ref={grid} className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
