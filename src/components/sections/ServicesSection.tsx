import { SERVICES } from '../../data'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useRef, useEffect, useState } from 'react'

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`
    }
    const handleMouseLeave = () => {
      el.style.transform = ''
      el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    }
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-8 group holo-card"
      style={{
        background: 'rgba(12,14,19,0.7)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${service.color}44`
        setHovered(true)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        setHovered(false)
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${service.color}10 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{
            background: `${service.color}14`,
            border: `1px solid ${service.color}28`,
          }}
        >
          <ServiceIcon name={service.icon} color={service.color} />
        </div>

        <h3
          className="font-semibold text-white text-xl mb-3"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {service.title}
        </h3>
        <p className="text-white/40 text-sm leading-[1.7]">
          {service.description}
        </p>

        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-white/30 text-sm uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            View Details
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${service.color}, ${service.color}88)`,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
            }}
          >
            <ArrowRight size={16} color="#08090c" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    Automation: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M2 9h20" />
        <path d="M6 14h12" />
      </svg>
    ),
    Voice: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    Ad: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    Whop: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    Support: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  }
  return icons[name] || icons.Automation
}

function ArrowRight({ size = 20, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function Sparkles({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="m17 7 4 4" />
      <path d="M22 12h-4" />
      <path d="m17 17 4-4" />
      <path d="M12 18v4" />
      <path d="m7 17-4 4" />
      <path d="M2 12h4" />
      <path d="m7 7-4-4" />
    </svg>
  )
}

export function ServicesSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="services" className="reveal relative z-10 py-32 px-6" style={{ background: '#08090c' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #a78bfa)' }} />
            <p className="text-center text-[11px] tracking-[0.22em] uppercase font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(167,139,250,0.9)' }}>
              What We Do
            </p>
            <span className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, #a78bfa)' }} />
          </div>
          <h2
            className="font-bold text-white mb-6"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            We design AI-powered systems that <span className="gradient-text">replace manual labor</span>, streamline operations, and scale your business — without the burnout.
          </h2>
          <p className="text-white/35 text-lg leading-[1.65] max-w-2xl mx-auto">
            Whether you're looking to automate outreach, run AI voice agents, or create ad content that converts, our solutions are built to give you leverage and results from day one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}