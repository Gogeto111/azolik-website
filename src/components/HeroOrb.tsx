import { useEffect, useRef } from 'react'

export function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let ticking = false

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    const update = () => {
      const mx = (mouse.current.x - 0.5) * 2
      const my = (mouse.current.y - 0.5) * 2
      el.style.transform = `perspective(800px) rotateY(${mx * 18}deg) rotateX(${-my * 14}deg)`
      ticking = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] flex-shrink-0"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(14,165,233,0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translateZ(-60px)',
        }}
      />

      {/* Main rotating card */}
      <div
        className="absolute inset-4 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(12,14,19,0.95), rgba(18,20,27,0.95))',
          border: '1px solid rgba(167,139,250,0.2)',
          boxShadow: '0 0 60px rgba(124,58,237,0.15), 0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(79,209,197,0.08), rgba(251,146,60,0.06), transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-badge-pulse" />
              <span className="text-emerald-400 text-[10px] tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Active
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Support', status: '12 tickets resolved', color: '#4fd1c5', pct: 94 },
                { label: 'Sales', status: '3 meetings booked', color: '#a78bfa', pct: 87 },
                { label: 'Marketing', status: '5 posts scheduled', color: '#fb923c', pct: 78 },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/60 text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {d.label}
                      </span>
                      <span className="text-white/30 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {d.status}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${d.pct}%`,
                          background: `linear-gradient(90deg, ${d.color}88, ${d.color})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
            <span className="text-white/25 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              AzoliK Dashboard
            </span>
            <span className="text-white/20 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Floating mini card - top right */}
      <div
        className="absolute -top-2 -right-4 w-28 rounded-xl p-3 animate-float"
        style={{
          background: 'rgba(12,14,19,0.9)',
          border: '1px solid rgba(79,209,197,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          transform: 'translateZ(50px)',
          animationDelay: '-2s',
        }}
      >
        <div className="text-emerald-400 text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>+24%</div>
        <div className="text-white/30 text-[9px] mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Conv. rate</div>
      </div>

      {/* Floating mini card - bottom left */}
      <div
        className="absolute -bottom-3 -left-6 w-32 rounded-xl p-3 animate-float"
        style={{
          background: 'rgba(12,14,19,0.9)',
          border: '1px solid rgba(167,139,250,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          transform: 'translateZ(40px)',
          animationDelay: '-4s',
        }}
      >
        <div className="text-violet-400 text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>48h</div>
        <div className="text-white/30 text-[9px] mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Deploy time</div>
      </div>

      {/* Orbiting ring */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: 'translateZ(10px)' }}
      >
        <div
          className="w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] rounded-full animate-ring"
          style={{
            border: '1px solid rgba(167,139,250,0.08)',
            borderTopColor: 'rgba(167,139,250,0.2)',
            position: 'absolute',
          }}
        />
        <div
          className="w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] rounded-full animate-ring"
          style={{
            border: '1px solid rgba(79,209,197,0.05)',
            borderBottomColor: 'rgba(79,209,197,0.15)',
            position: 'absolute',
            animationDirection: 'reverse',
            animationDuration: '18s',
          }}
        />
      </div>
    </div>
  )
}
