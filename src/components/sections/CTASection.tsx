import { useRef, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { CTA_SERVICES } from '../../data'
import { ContactForm } from '../ContactForm'

export function CTASection() {
  const ref = useScrollReveal<HTMLElement>()
  const orbRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

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
    <section ref={ref} id="cta" className="reveal relative z-10 py-24 px-6" style={{ background: '#08090c' }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl p-8 lg:p-16 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(14,165,233,0.1))',
            border: '1px solid rgba(124,58,237,0.2)',
            transformStyle: 'preserve-3d',
          }}
        >
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

          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.55) 0%, transparent 60%)' }} />

          <div className="relative z-10">
            <h2
              className="font-bold text-white mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 58px)' }}
            >
              Each project we undertake is a <span className="gradient-text">unique opportunity</span>.
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-md mx-auto leading-[1.65]">
              Ready to take the next step? Join us now and start transforming your vision into reality with expert support.
            </p>

            <div className="max-w-md mx-auto mb-10">
              <ContactForm
                type="demo"
                title="Book an appointment"
                description="Let's discuss your project and how we can help"
                buttonText="Get in touch"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CTA_SERVICES.map((service, i) => (
                <span
                  key={service}
                  className="px-3 py-1 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {service}
                </span>
              ))}
            </div>

            <p className="mt-8 text-white/22 text-sm">
              YouTube Shorts · YouTube Videos · Instagram Reels · Blog · TikTok · Brandings · Ads
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}