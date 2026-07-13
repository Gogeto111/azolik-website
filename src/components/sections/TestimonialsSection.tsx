import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { TESTIMONIALS } from '../../data'

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.01, 1.01, 1.01)`
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
      className="relative rounded-2xl p-7 transition-all duration-300 group flex flex-col h-full entrance-fade-up"
      style={{
        background: 'rgba(12,14,19,0.8)',
        border: `1px solid ${testimonial.color}22`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${testimonial.color}0c 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-5">
          {[...Array(5)].map((_, j) => (
            <svg key={j} width={15} height={15} viewBox="0 0 24 24" className="stroke-none" style={{ color: testimonial.color }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
            </svg>
          ))}
        </div>

        <div className="relative mb-6 flex-1">
          <svg
            className="absolute -top-1 -left-1 text-white/8"
            width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3z" />
          </svg>
          <p className="text-white/55 leading-[1.75] relative text-[15px]">
            {testimonial.quote}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-5 border-t border-white/5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}88)`,
            }}
          >
            {testimonial.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-white text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {testimonial.name}
            </p>
            <p className="text-white/35 text-xs truncate">{testimonial.role}, {testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="testimonials" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
            style={{
              borderColor: 'rgba(251,146,60,0.3)',
              background: 'rgba(251,146,60,0.08)',
              color: '#fdba74',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Testimonials
          </span>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            Trusted by growing teams
          </h2>
          <p className="text-white/35 max-w-lg mx-auto leading-[1.65]">
            See what teams experience when they deploy AzoliK.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}