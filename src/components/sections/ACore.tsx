import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel, GradientText } from '../ui'

export function ACoreSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="acore" className="reveal relative z-10 py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel color="rgba(79,209,197,0.9)">The Core</SectionLabel>
        <h2
          className="text-center font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          One <GradientText>Intelligence</GradientText>.<br />
          Six <GradientText>Departments</GradientText>.<br />
          Zero <GradientText>Management</GradientText>.
        </h2>
        <p className="text-center text-white/38 text-base max-w-lg mx-auto mb-20 leading-[1.65]">
          A Core is the central nervous system that coordinates all departments, system of your AI workforce. It doesn&apos;t just
          manage — it thinks, decides, and acts across every department.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl p-7 holo-card card-glow" style={{ background: 'rgba(12,14,19,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="font-bold text-white text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Unified Brain</h3>
            <p className="text-white/45 text-sm leading-[1.6]">Single intelligence coordinating all six departments with shared context, memory, and goals.</p>
          </div>

          <div className="rounded-2xl p-7 holo-card card-glow" style={{ background: 'rgba(12,14,19,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="font-bold text-white text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Real-time Sync</h3>
            <p className="text-white/45 text-sm leading-[1.6]">Every department reads and writes to the same knowledge graph. No silos, no stale data, no manual handoffs.</p>
          </div>

          <div className="rounded-2xl p-7 holo-card card-glow" style={{ background: 'rgba(12,14,19,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 14 15 20 9" />
              </svg>
            </div>
            <h3 className="font-bold text-white text-xl mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Autonomous Decisions</h3>
            <p className="text-white/45 text-sm leading-[1.6]">The Core makes cross-department decisions — routing tickets, prioritizing leads, reallocating budgets — without human bottlenecks.</p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-white/35 text-sm mb-6">Built for teams that want outcomes, not overhead.</p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shimmer-btn ripple"
            style={{
              background: '#f5f5f7',
              color: '#08090c',
              boxShadow: '0 0 40px rgba(245,245,247,0.14), 0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            Start Using Now
          </a>
        </div>
      </div>
    </section>
  )
}