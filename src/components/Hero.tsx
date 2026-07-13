import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  const [visible, setVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 60%), #08090c',
      }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Top badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            borderColor: 'rgba(167,139,250,0.3)',
            background: 'rgba(167,139,250,0.08)',
            color: '#c4b5fd',
          }}
        >
          <Sparkles className="w-4 h-4" style={{ color: '#a78bfa' }} />
          <span>New: AI Voice Agents Now Live</span>
        </div>

        {/* Main headline */}
        <div
          className={`mt-10 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h1
            className="font-bold leading-[0.95] tracking-[-0.04em] max-w-5xl mx-auto"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 1,
            }}
          >
            <span className="gradient-text block">The Future of Business</span>
            <br />
            <span className="gradient-text block">Is Automated</span>
            <br />
            <span className="text-white block" style={{ fontWeight: 700 }}>— Are You Ready?</span>
          </h1>

          <p
            className="mt-8 text-white/50 max-w-2xl mx-auto leading-[1.7]"
            style={{ fontSize: 'clamp(18px, 2.2vw, 22px)' }}
          >
            Your One Stop Solution <span className="font-semibold text-white">For All Content Needs.</span>
          </p>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {['1000+', '95%', '100+'].map((stat, i) => (
            <div key={stat} className="text-center">
              <div
                className="font-bold text-white mb-1"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  background: 'linear-gradient(135deg, #a78bfa, #4fd1c5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat}
              </div>
              <div className="text-white/35 text-sm uppercase tracking-wide">
                {['Projects Completed', 'Client Retention', 'Satisfied Clients'][i]}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <a
            href="#cta"
            className="shimmer-btn group w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-[#08090c] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: '#f5f5f7',
              boxShadow: '0 0 40px rgba(245,245,247,0.14), 0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <span className="flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white/80 hover:text-white transition-colors border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm"
          >
            Explore Services
          </a>
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-20 flex flex-wrap items-center justify-center gap-6 text-white/25 text-sm transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {['Content Strategy', 'AI Automation', 'Video Production', 'Social Growth', 'Brand Building'].map((item, i) => (
            <span key={item} className="flex items-center gap-1.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
              {item}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 animate-bounce-subtle">
          <span className="text-xs text-white/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #a78bfa, #4fd1c5, #fb923c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </section>
  )
}