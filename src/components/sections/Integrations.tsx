import { useEffect, useRef } from 'react'
import { INTEGRATIONS } from '../../data'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ScrollRevealText } from '../ScrollRevealText'

function TickerRow({ items, reverse = false }: { items: typeof INTEGRATIONS; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const width = el.scrollWidth / 2
    const duration = width / 0.012 // ultra slow: ~0.012px per ms
    let start: number | null = null
    let raf: number

    const tick = (now: number) => {
      if (start === null) start = now
      const elapsed = (now - start) % duration
      const progress = elapsed / duration
      const offset = reverse ? -(width * (1 - progress)) : -(width * progress)
      el.style.transform = `translate3d(${offset}px, 0, 0)`
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reverse])

  const list = reverse ? items.slice().reverse() : items
  const doubled = [...list, ...list]

  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
    >
      <div
        ref={trackRef}
        className="flex gap-3 w-max will-change-transform"
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/40 text-sm font-medium hover:text-white/68 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200"
            style={{ cursor: 'none' }}
          >
            <span
              className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold flex-shrink-0"
              style={{ background: `${t.hex}22`, color: t.hex }}
            >
              {t.i}
            </span>
            {t.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export function IntegrationsSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="integrations" className="reveal relative z-10 py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <p
          className="text-white/25 text-[11px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <ScrollRevealText>Connects with your entire stack</ScrollRevealText>
        </p>
      </div>

      <div className="mb-3">
        <TickerRow items={INTEGRATIONS} />
      </div>
      <div>
        <TickerRow items={INTEGRATIONS} reverse />
      </div>
    </section>
  )
}
