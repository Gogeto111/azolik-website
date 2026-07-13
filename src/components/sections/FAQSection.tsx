import { useState, useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { FAQS } from '../../data'
import { SectionLabel } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function AccordionItem({ faq, isOpen, onToggle }: {
  faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-300"
      style={{
        borderColor: isOpen ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.07)',
        background: isOpen ? 'rgba(96,165,250,0.04)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 gap-4 text-left"
      >
        <span className="text-white/72 font-medium text-sm leading-[1.5]">{faq.q}</span>
        <div
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(96,165,250,0.25)' : 'rgba(255,255,255,0.06)',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        >
          <Plus size={10} color={isOpen ? '#60a5fa' : 'rgba(255,255,255,0.5)'} />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-5">
          <p className="text-white/42 text-sm leading-[1.7]">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section ref={ref} id="faqs" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel color="rgba(96,165,250,0.9)">FAQs</SectionLabel>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(30px, 4vw, 46px)' }}
          >
            You ask? We answer
          </h2>
          <p className="text-white/35 max-w-lg mx-auto leading-[1.65]">
            Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              isOpen={active === i}
              onToggle={() => setActive(active === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
