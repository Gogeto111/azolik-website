import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const QUICK_REPLIES = [
  'How does AzoliK work?',
  'What are the pricing plans?',
  'Which industries do you support?',
  'How fast can I get started?',
]

const AUTO_REPLIES: Record<string, string> = {
  default: "Thanks for your interest! AzoliK deploys six AI departments — Support, Sales, Marketing, Finance, Operations, and HR — that work autonomously from day one. Would you like to know about pricing or how to get started?",
  pricing: "AzoliK offers three plans: Solo at ₹299/mo (6 months free), Team at ₹799/mo (14-day free trial), and Enterprise with custom pricing. All plans include our full AI workforce.",
  industries: "We support E-commerce, Legal, Healthcare, Real Estate, Consulting, Restaurants, and more. Each department is pre-trained on your industry's workflows.",
  started: "Getting started takes under 48 hours. Just describe your business, and we'll staff your AI team. No engineering required on your end.",
  work: "AzoliK uses purpose-built AI agents for each department. They connect to your existing tools (CRM, email, chat, etc.) and handle tasks autonomously — escalating to you only when a human decision is needed.",
}

function getReply(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('pric') || lower.includes('cost') || lower.includes('plan')) return AUTO_REPLIES.pricing
  if (lower.includes('industr') || lower.includes('sector')) return AUTO_REPLIES.industries
  if (lower.includes('start') || lower.includes('begin') || lower.includes('fast')) return AUTO_REPLIES.started
  if (lower.includes('work') || lower.includes('how') || lower.includes('do')) return AUTO_REPLIES.work
  return AUTO_REPLIES.default
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ from: 'user' | 'ai'; text: string }>>([
    { from: 'ai', text: "Hi! I'm the AzoliK assistant. Ask me anything about our AI workforce." },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'ai', text: getReply(text) }])
      setTyping(false)
    }, 800 + Math.random() * 600)
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: open
            ? 'rgba(255,255,255,0.08)'
            : 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
          boxShadow: open
            ? 'none'
            : '0 0 40px rgba(124,58,237,0.3), 0 8px 32px rgba(0,0,0,0.4)',
          border: open ? '1px solid rgba(255,255,255,0.08)' : 'none',
          cursor: 'none',
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <X size={20} color="rgba(255,255,255,0.6)" />
        ) : (
          <MessageCircle size={22} color="white" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: 'rgba(12,14,19,0.98)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.1)',
            animation: 'panel-up 0.3s var(--ease) both',
            height: '440px',
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3 border-b border-white/[0.06]"
            style={{ background: 'rgba(124,58,237,0.08)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
            >
              <span className="text-white text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>A</span>
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                AzoliK Assistant
              </p>
              <p className="text-white/30 text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Typically replies instantly
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(14,165,233,0.2))'
                      : 'rgba(255,255,255,0.04)',
                    border: msg.from === 'user'
                      ? '1px solid rgba(124,58,237,0.25)'
                      : '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl flex gap-1"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/30"
                      style={{ animation: 'badge-pulse 1s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="px-5 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-3 py-1.5 rounded-full text-[11px] transition-all duration-200 hover:bg-white/[0.08] active:scale-95"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'none',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/[0.06]">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/30"
                style={{ cursor: 'none' }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #7c3aed, #0ea5e9)' : 'rgba(255,255,255,0.04)',
                  opacity: input.trim() ? 1 : 0.3,
                  cursor: 'none',
                }}
              >
                <Send size={14} color="white" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
