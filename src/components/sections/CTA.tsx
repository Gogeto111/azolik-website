import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useRef, useEffect, useState } from 'react'
import { ContactForm } from '../ContactForm'
import { Mail, Phone, Calendar, ArrowRight } from 'lucide-react'

export function CTASection() {
  const ref = useScrollReveal<HTMLElement>()
  const orbRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [showLetTalk, setShowLetTalk] = useState(false)

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

  const openCalendly = () => {
    window.open('https://cal.id/shivanshsrivastava/standard-meeting?duration=30&overlayCalendar=true&layout=month_view', '_blank', 'noopener,noreferrer')
  }

  return (
    <section ref={ref} id="cta" className="reveal relative z-10 py-24 px-6">
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
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 60px)' }}
            >
              Ready to transform your business?
            </h2>
            <p className="text-white/45 text-lg mb-10 max-w-md mx-auto leading-[1.65]">
              Deploy AI departments, automate workflows, and scale without hiring.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                onClick={openCalendly}
                className="w-full sm:w-auto shimmer-btn ripple px-8 py-4 rounded-xl text-base font-semibold text-[#08090c] transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{
                  background: '#f5f5f7',
                  boxShadow: '0 0 40px rgba(245,245,247,0.14), 0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <Calendar size={20} />
                Start Using Now
              </button>

              <button
                onClick={() => setShowLetTalk(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-80 active:scale-[0.98] flex items-center justify-center gap-2 btn-press ripple border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:text-white/78 text-white/55"
                style={{ cursor: 'none' }}
              >
                <Mail size={20} />
                Let's Talk
              </button>
            </div>

            <p className="mt-8 text-white/22 text-sm">
              Solo: 6 months free · Team: 14-day free trial · No credit card
            </p>

            {showLetTalk && (
              <div className="mt-12 pt-8 border-t border-white/10" style={{ animation: 'panel-up 0.5s var(--ease) both' }}>
                <h3 className="font-bold text-white text-xl mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Book a 30-min Strategy Session
                </h3>
                <p className="text-white/45 text-sm mb-8 max-w-md mx-auto">
                  Tell us about your project. We'll show you exactly how Azolic AI departments can automate your operations.
                </p>

                <div className="max-w-md mx-auto space-y-4">
                  <ContactForm
                    type="contact"
                    title=""
                    description=""
                    buttonText="Schedule Meeting"
                  />
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <button
                      onClick={openCalendly}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                    >
                      <Calendar size={18} />
                      Pick a Time on Calendly
                    </button>
                    <a
                      href="mailto:aarishvimal1@gmail.com"
                      className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                    >
                      <Mail size={18} />
                      Email Us Directly
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setShowLetTalk(false)}
                  className="mt-6 text-white/40 text-sm hover:text-white/70 transition-colors"
                >
                  <ArrowRight size={16} className="inline mr-1" /> Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}