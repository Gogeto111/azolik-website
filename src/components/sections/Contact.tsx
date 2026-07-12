import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ContactForm } from '../ContactForm'
import { SectionLabel } from '../ui'

export function ContactSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="contact" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel color="rgba(79,209,197,0.9)">Contact</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-6"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 56px)' }}
        >
          Let&apos;s build your AI team.
        </h2>
        <p className="text-center text-white/40 text-lg mb-14 max-w-2xl mx-auto leading-[1.65]">
          Tell us about your business. We&apos;ll show you exactly which departments to deploy first and how fast you can be live.
        </p>

        <div className="max-w-xl mx-auto">
          <ContactForm
            type="contact"
            title="Start the conversation"
            description="We typically respond within a few hours."
            buttonText="Send message"
          />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              48h
            </div>
            <div className="text-white/40 text-sm">Time to deploy</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              6mo
            </div>
            <div className="text-white/40 text-sm">Free on Solo plan</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              150+
            </div>
            <div className="text-white/40 text-sm">Integrations ready</div>
          </div>
        </div>
      </div>
    </section>
  )
}