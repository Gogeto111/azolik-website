import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQS } from '../../data'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function FAQSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section ref={ref} id="faq" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionLabel color="rgba(96,165,250,0.9)">FAQ</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-14"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(30px, 4vw, 46px)' }}
        >
          Questions you're probably thinking.
        </h2>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden cursor-pointer transition-all duration-200"
              style={{
                borderColor: active === i ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.07)',
                background: active === i ? 'rgba(96,165,250,0.04)' : 'rgba(255,255,255,0.02)',
              }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <span className="text-white/72 font-medium text-sm leading-[1.5]">{faq.q}</span>
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: active === i ? 'rgba(96,165,250,0.25)' : 'rgba(255,255,255,0.06)',
                    transform: active === i ? 'rotate(45deg)' : 'none',
                  }}
                >
                  <Plus size={10} color={active === i ? '#60a5fa' : 'rgba(255,255,255,0.5)'} />
                </div>
              </div>
              {active === i && (
                <div className="px-5 pb-5">
                  <p className="text-white/42 text-sm leading-[1.7]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
