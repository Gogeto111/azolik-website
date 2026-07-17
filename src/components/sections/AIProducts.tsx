import { useState } from 'react'
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
    details: {
      features: [
        'Custom lead generation pipelines that capture, score, and route leads automatically',
        'Automated outreach sequences across email, LinkedIn, and SMS',
        'Client onboarding workflows that eliminate manual handoffs',
        'CRM automation — auto-enrich contacts, update deals, trigger follow-ups',
        'Slack/Teams notifications for high-priority events',
        'Analytics dashboards tracking every automated touchpoint',
      ],
      howItWorks: 'We analyze your current manual processes, identify bottlenecks, and build custom automation flows using tools like n8n, Zapier, or custom scripts. Each system is tailored to your exact workflow — no cookie-cutter templates.',
      timeline: '2-4 weeks from discovery to deployment',
    },
  },
  {
    id: 'ai-website-developer',
    title: 'AI Website Developer',
    description: 'AI-powered websites that build, optimize, and maintain themselves. From landing pages to full web apps — deployed in hours, not weeks.',
    icon: 'Code',
    color: '#a78bfa',
    href: '#',
    details: {
      features: [
        'AI-generated landing pages optimized for conversion from day one',
        'Self-healing websites that detect and fix broken links, 404s, and performance issues',
        'Automatic A/B testing — AI rotates layouts, copy, and CTAs to find what converts',
        'SEO optimization that adapts to algorithm changes in real-time',
        'Content updates auto-generated from your product catalog or blog feed',
        'Performance monitoring with automatic image compression and code optimization',
      ],
      howItWorks: 'Our AI architect analyzes your brand, audience, and goals, then generates a production-ready website. Post-launch, the AI continuously monitors performance and makes data-driven improvements without human intervention.',
      timeline: 'Landing pages in hours, full web apps in 1-2 weeks',
    },
  },
  {
    id: 'ai-video-generation',
    title: 'AI Video Generation',
    description: 'Generate professional videos with AI avatars, voiceovers, and editing. Scale content production for marketing, training, and social media.',
    icon: 'Video',
    color: '#fb923c',
    href: '#',
    details: {
      features: [
        'AI avatar presenters that look and speak naturally — no actors needed',
        'Multi-language voiceover generation in 50+ languages',
        'Automated video editing — cuts, transitions, captions, and branding applied instantly',
        'Template-based batch production — create 100 product videos from a single spreadsheet',
        'Social media format adaptation — auto-resize for TikTok, Reels, YouTube Shorts',
        'Script-to-video pipeline — write a script, get a finished video in minutes',
      ],
      howItWorks: 'Feed the AI your script, product images, or brand guidelines. It selects the right avatar, generates voiceover, composes scenes, adds captions and music, and outputs platform-ready video files — all without a camera crew.',
      timeline: 'Single videos in minutes, batch campaigns in 1-2 days',
    },
  },
  {
    id: 'ai-salesforce',
    title: 'AI Salesforce',
    description: 'Autonomous AI sales agents that qualify leads, write personalized outreach, book meetings, and manage your pipeline 24/7.',
    icon: 'Users',
    color: '#34d399',
    href: 'https://www.azolic.com/ai-salesforce',
    details: {
      features: [
        'Autonomous lead qualification — AI scores and segments every inbound lead',
        'Hyper-personalized cold outreach using real company data and buying signals',
        'Multi-touch follow-up sequences that adapt based on prospect engagement',
        'Meeting scheduling directly into your calendar with zero back-and-forth',
        'Pipeline management — AI updates deal stages, flags stalled opportunities',
        'Win/loss analysis that identifies patterns and improves targeting over time',
      ],
      howItWorks: 'Connect your CRM, email, and calendar. The AI sales agent learns your ICP, monitors intent signals, crafts personalized messages, and manages the entire outreach cycle — only escalating to you when a meeting is booked or a deal needs your input.',
      timeline: 'First outreach within 48 hours of setup',
    },
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
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

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
          {AI_PRODUCTS.map((product, i) => {
            const isExpanded = expandedId === product.id
            return (
              <div
                key={product.id}
                className="relative rounded-2xl group holo-card card-glow entrance-scale-up overflow-hidden"
                style={{
                  background: 'rgba(12,14,19,0.7)',
                  border: `1px solid ${isExpanded ? `${product.color}44` : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'border-color 0.3s ease, background 0.3s ease, max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  animationDelay: `${i * 100}ms`,
                  ['--glow-color' as string]: `${product.color}20`,
                  maxHeight: isExpanded ? '1200px' : '600px',
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.borderColor = `${product.color}44`
                    e.currentTarget.style.background = `${product.color}08`
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.background = 'rgba(12,14,19,0.7)'
                  }
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${product.color}10 0%, transparent 50%)`,
                  }}
                />

                <div className="relative z-10 p-8">
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

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div
                      className="mt-4 space-y-5"
                      style={{ animation: 'panel-up 0.4s var(--ease) both' }}
                    >
                      <div>
                        <p
                          className="text-[10px] tracking-[0.2em] uppercase mb-3"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: product.color, opacity: 0.7 }}
                        >
                          Key Features
                        </p>
                        <ul className="space-y-2">
                          {product.details.features.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2">
                              <div
                                className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: `${product.color}18` }}
                              >
                                <svg width="8" height="8" viewBox="0 0 9 9" fill="none">
                                  <path d="M1.5 4.5L3.8 7L7.5 2.5" stroke={product.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-white/48 text-xs leading-[1.6]">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <p
                          className="text-[10px] tracking-[0.2em] uppercase mb-2"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: product.color, opacity: 0.7 }}
                        >
                          How It Works
                        </p>
                        <p className="text-white/40 text-xs leading-[1.7]">
                          {product.details.howItWorks}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: product.color }}
                        />
                        <span className="text-white/30 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          {product.details.timeline}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Learn More Toggle */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <button
                      onClick={() => toggle(product.id)}
                      className="w-full flex items-center justify-between group/btn"
                      style={{ cursor: 'none' }}
                    >
                      <span className="text-white/30 text-sm uppercase tracking-wide transition-colors group-hover/btn:text-white/60" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {isExpanded ? 'Show Less' : 'Learn More'}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}, ${product.color}88)`,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#08090c"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>

                  {product.href !== '#' && (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block text-center py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                      style={{
                        background: `${product.color}18`,
                        border: `1px solid ${product.color}30`,
                        color: product.color,
                      }}
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
