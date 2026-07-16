import { useScrollReveal } from '../../hooks/useScrollReveal'
import { SectionLabel } from '../ui'

const AI_PRODUCTS = [
  {
    id: 'automation-agency',
    title: 'Automation Agency',
    description: 'We build custom automation systems for lead generation, outreach, client onboarding, CRM workflows, and more — built to save you time and scale efficiently.',
    icon: 'Automation',
    color: '#4fd1c5',
    href: 'https://www.azolic.com/automation',
  },
  {
    id: 'ai-website-developer',
    title: 'AI Website Developer',
    description: 'AI-powered websites that build, optimize, and maintain themselves. From landing pages to full web apps — deployed in hours, not weeks.',
    icon: 'Code',
    color: '#a78bfa',
    href: '#',
  },
  {
    id: 'ai-video-generation',
    title: 'AI Video Generation',
    description: 'Generate professional videos with AI avatars, voiceovers, and editing. Scale content production for marketing, training, and social media.',
    icon: 'Video',
    color: '#fb923c',
    href: '#',
  },
  {
    id: 'ai-salesforce',
    title: 'AI Salesforce',
    description: 'Autonomous AI sales agents that qualify leads, write personalized outreach, book meetings, and manage your pipeline 24/7.',
    icon: 'Users',
    color: '#34d399',
    href: 'https://www.azolic.com/ai-salesforce',
  },
]

function ProductIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    Automation: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M2 9h20" />
        <path d="M6 14h12" />
      </svg>
    ),
    Code: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    Video: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    Users: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  }
  return icons[name] || icons.Automation
}

export function AIProductsSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="ai-products" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel color="rgba(251,146,60,0.9)">AI Products</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-6"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 60px)' }}
        >
          Beyond AI departments — specialized AI products
        </h2>
        <p className="text-center text-white/35 text-lg mb-16 max-w-2xl mx-auto leading-[1.65]">
          Specialized AI tools for specific business functions. Each product solves a distinct problem end-to-end.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_PRODUCTS.map((product, i) => (
            <a
              key={product.id}
              href={product.href}
              target={product.href !== '#' ? '_blank' : undefined}
              rel={product.href !== '#' ? 'noopener noreferrer' : undefined}
              className="relative rounded-2xl p-8 group holo-card card-glow entrance-scale-up"
              style={{
                background: 'rgba(12,14,19,0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transition: 'border-color 0.3s ease, background 0.3s ease',
                animationDelay: `${i * 100}ms`,
                ['--glow-color' as string]: `${product.color}20`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${product.color}44`
                e.currentTarget.style.background = `${product.color}08`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(12,14,19,0.7)'
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${product.color}10 0%, transparent 50%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `${product.color}14`,
                    border: `1px solid ${product.color}28`,
                  }}
                >
                  <ProductIcon name={product.icon} color={product.color} />
                </div>

                <h3
                  className="font-semibold text-white text-xl mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {product.title}
                </h3>
                <p className="text-white/40 text-sm leading-[1.7] mb-6">
                  {product.description}
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-white/30 text-sm uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Learn More
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}, ${product.color}88)`,
                      opacity: 1,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#08090c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}