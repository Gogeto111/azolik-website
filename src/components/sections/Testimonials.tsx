import { SectionLabel } from '../ui'
import { TESTIMONIALS } from '../../data'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative z-10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel color="rgba(251,146,60,0.9)">Testimonials</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-4"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)' }}
        >
          Trusted by growing teams
        </h2>
        <p className="text-center text-white/35 max-w-lg mx-auto mb-14 leading-[1.65]">
          Demo testimonials showing what teams experience with AzoliK.
        </p>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl" />
          
          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-1">
            {TESTIMONIALS.map((testimonial, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-8 transition-all duration-300 group"
                style={{
                  background: 'rgba(12,14,19,0.9)',
                  border: `1px solid ${testimonial.color}33`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="stroke-none" style={{ color: testimonial.color }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
                    </svg>
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <svg
                    className="absolute -top-2 -left-2 text-white/10"
                    width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3zM8 4h8v2H8V4z" />
                  </svg>
                  <p className="text-white/65 leading-[1.7] relative text-base">
                    {TESTIMONIALS[i].quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ background: TESTIMONIALS[i].color }}
                  >
                    {TESTIMONIALS[i].avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {TESTIMONIALS[i].name}
                    </p>
                    <p className="text-white/40 text-xs">{TESTIMONIALS[i].role}, {TESTIMONIALS[i].company}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-medium text-white/50 bg-white/5 border border-white/10">
                  Demo
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}