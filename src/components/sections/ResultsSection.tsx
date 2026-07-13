import { RESULTS } from '../../data'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function ResultsSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="results" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {RESULTS.map((result, i) => (
            <div
              key={result.label}
              className="relative text-center p-8 rounded-2xl group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.4s ease, background 0.4s ease',
                animationDelay: `${i * 100}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)'
                e.currentTarget.style.background = 'rgba(52,211,153,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.12) 0%, transparent 50%)',
                }}
              />

              <div className="relative z-10">
                <div
                  className="font-bold text-white mb-2"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(40px, 5vw, 56px)',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #34d399, #34d39999)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {result.metric}
                </div>
                <p
                  className="text-white/40 text-sm tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {result.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}