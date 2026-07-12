import { GradientText } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ScrollRevealText } from '../ScrollRevealText'

export function QuoteSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="quote" className="reveal relative z-10 py-40 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Glow behind text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            style={{
              width: '600px',
              height: '400px',
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div className="relative z-10">
          <ScrollRevealText>
            <blockquote
              className="font-bold leading-[1.1] tracking-[-0.03em]"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(36px, 6vw, 84px)' }}
            >
              <span className="text-white/30">Most AIs work </span>
              <span className="text-white">with you.</span>
              <br />
              <GradientText>AzoliK works </GradientText>
              <span className="text-white">for you.</span>
            </blockquote>
          </ScrollRevealText>

          <ScrollRevealText>
            <p
              className="mt-10 text-white/30 text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              — The AzoliK principle
            </p>
          </ScrollRevealText>
        </div>
      </div>
    </section>
  )
}
