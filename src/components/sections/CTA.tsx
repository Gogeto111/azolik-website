import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useRef, useEffect } from 'react'

export function CTASection() {
  const ref = useScrollReveal<HTMLElement>()
  const orbRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // Subtle parallax on the CTA container
  useEffect(() => {
    let ticking = false
    const update = () => {
      if (orbRef.current) {
        const sy = window.scrollY
        orbRef.current.style.transform = `translate3d(0, ${-sy * 0.02}px, 0)`
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} id="cta" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl p-16 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(14,165,233,0.1))',
            border: '1px solid rgba(124,58,237,0.2)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating glow orbs */}
          <div
            ref={orbRef}
            className="absolute pointer-events-none"
            style={{
              top: '-40px',
              left: '20%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
              filter: 'blur(20px)',
              willChange: 'transform',
            }}
          />
          <div
            ref={glowRef}
            className="absolute pointer-events-none"
            style={{
              bottom: '-60px',
              right: '15%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Top glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.55) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10">
            <h2
              className="font-bold text-white mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 60px)' }}
            >
              Your team is ready.
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-md mx-auto leading-[1.65]">
              Give your business a full AI workforce. Six departments, working autonomously from day one — no engineers, no long setup.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://azolik.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="shimmer-btn px-8 py-4 rounded-xl text-base font-semibold text-[#08090c] transition-all duration-200 hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]"
                style={{
                  background: '#f5f5f7',
                  boxShadow: '0 0 48px rgba(245,245,247,0.12)',
                }}
              >
                Start your free trial
              </a>
              <a
                href="https://azolik.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl text-base font-medium text-white/55 border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:text-white/78 transition-all duration-200"
              >
                Talk to sales
              </a>
            </div>
            <p className="mt-6 text-white/22 text-sm">
              Solo: 6 months free · Team: 14-day free trial · No credit card
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
