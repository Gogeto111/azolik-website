import { GlassCard, GradientText, SectionLabel, CheckMark } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useTilt } from '../../hooks/useTilt'
import { ScrollRevealText } from '../ScrollRevealText'

function TiltCard({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`card-3d ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export function ProblemSection() {
  const ref = useScrollReveal<HTMLElement>()
  const stagger = useScrollReveal<HTMLDivElement>()

  const team = ['Sales team', 'Support team', 'Marketing team', 'Finance dept.', 'Operations', 'HR team']

  return (
    <section ref={ref} id="problem" className="reveal relative z-10 py-36 px-6 overflow-hidden">
      {/* Perspective grid floor */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          perspective: '600px',
          perspectiveOrigin: '50% 60%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-20%',
            right: '-20%',
            height: '60%',
            backgroundImage:
              'linear-gradient(rgba(167,139,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transform: 'rotateX(65deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 70%)',
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <SectionLabel>The problem</SectionLabel>
        <h2
          className="text-center font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 68px)' }}
        >
          Big companies have full teams.
          <br />
          <ScrollRevealText>You have caffeine and a dream.</ScrollRevealText>
        </h2>
        <p className="text-center text-white/35 max-w-lg mx-auto mb-20 leading-[1.65]">
          The talent gap isn't fair. So we cheated and built AI that works while you sleep.
        </p>

        <div ref={stagger} className="reveal-stagger grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Enterprise */}
          <TiltCard>
            <GlassCard className="p-8">
              <div className="flex items-center gap-2.5 mb-7">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span
                  className="text-white/38 text-[11px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                   Enterprise company — full team
                </span>
              </div>
              <div className="space-y-2">
                {team.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.22)' }}
                    >
                      <CheckMark color="#34d399" />
                    </div>
                    <span className="text-white/58 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TiltCard>

          {/* Solo */}
          <TiltCard>
            <GlassCard className="p-8" style={{ borderColor: 'rgba(239,68,68,0.18)' }}>
              <div className="flex items-center gap-2.5 mb-7">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span
                  className="text-white/38 text-[11px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Your business — just you
                </span>
              </div>
              <div className="space-y-2">
                <div
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.14)' }}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.22)' }}
                  >
                    <span className="text-red-400 text-[9px] font-bold">!</span>
                  </div>
                  <span className="text-white/58 text-sm">One exhausted owner.</span>
                </div>
                {team.slice(1).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-dashed border-white/[0.05]"
                  >
                    <div className="w-5 h-5 rounded-md bg-white/[0.02]" />
                    <span className="text-white/12 text-sm">Vacant...</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TiltCard>
        </div>

        <div className="flex justify-center mt-16">
          <div
            className="p-px rounded-2xl max-w-2xl w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.4), rgba(14,165,233,0.3), rgba(79,209,197,0.2))',
            }}
          >
            <div className="px-8 py-7 rounded-2xl text-center" style={{ background: '#08090c' }}>
              <p
                className="text-white/68 leading-[1.55]"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(17px, 2vw, 22px)' }}
              >
                Until now, a full team was a{' '}
                <span className="text-white font-semibold">luxury for big companies.</span>
                <br />
                <GradientText>Now it's just Tuesday for you.</GradientText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
