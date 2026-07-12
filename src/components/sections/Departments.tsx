import { useState, useEffect, useCallback } from 'react'
import { DEPARTMENTS } from '../../data'
import { SectionLabel, CheckMark } from '../ui'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ScrollRevealText } from '../ScrollRevealText'

// Node positions in a 560×460 SVG
const NODES = [
  { id: 'marketing',  x: 280, y: 42,  label: 'Marketing',  color: '#fb923c' },
  { id: 'support',    x: 72,  y: 138, label: 'Support',    color: '#4fd1c5' },
  { id: 'sales',      x: 488, y: 138, label: 'Sales',      color: '#a78bfa' },
  { id: 'finance',    x: 72,  y: 322, label: 'Finance',    color: '#34d399' },
  { id: 'operations', x: 488, y: 322, label: 'Operations', color: '#60a5fa' },
  { id: 'hr',         x: 280, y: 418, label: 'HR',         color: '#f472b6' },
]
const CORE = { x: 280, y: 230, label: 'CORE' }

const CONNECTIONS = NODES.map((n) => ({ from: n, to: CORE }))
const CROSS_CONNECTIONS = [
  { from: NODES[0], to: NODES[1] }, // marketing-support
  { from: NODES[0], to: NODES[2] }, // marketing-sales
  { from: NODES[1], to: NODES[3] }, // support-finance
  { from: NODES[2], to: NODES[4] }, // sales-operations
  { from: NODES[3], to: NODES[5] }, // finance-hr
  { from: NODES[4], to: NODES[5] }, // operations-hr
]

const BOOT_STEPS: Record<string, string[]> = {
  support:    ['Connecting Gmail Business...', 'Connecting WhatsApp...', 'Loading knowledge base...', 'Syncing Zendesk...', 'Ready — handling tickets now.'],
  sales:      ['Connecting HubSpot CRM...', 'Connecting Calendly...', 'Loading prospect data...', 'Calibrating lead scoring...', 'Ready — prospecting now.'],
  marketing:  ['Connecting Mailchimp...', 'Connecting Buffer...', 'Loading brand guidelines...', 'Syncing content calendar...', 'Ready — publishing now.'],
  finance:    ['Connecting QuickBooks...', 'Connecting Stripe...', 'Loading chart of accounts...', 'Syncing transactions...', 'Ready — reconciling now.'],
  operations: ['Connecting Slack...', 'Connecting Notion...', 'Loading project templates...', 'Syncing task backlog...', 'Ready — coordinating now.'],
  hr:         ['Connecting Greenhouse...', 'Connecting DocuSign...', 'Loading job descriptions...', 'Syncing candidate pipeline...', 'Ready — screening now.'],
}

function NeuralNetwork({
  activeId,
  onSelect,
}: {
  activeId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="relative w-full select-none" style={{ maxWidth: 560, margin: '0 auto' }}>
      <svg
        viewBox="0 0 560 460"
        className="w-full"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Cross connections */}
        {CROSS_CONNECTIONS.map(({ from, to }, i) => {
          const active =
            activeId === from.id || activeId === to.id
          return (
            <line
              key={`cross-${i}`}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={active ? from.color : 'rgba(255,255,255,0.04)'}
              strokeWidth={active ? 1.2 : 0.8}
              strokeDasharray={active ? '4 6' : '3 10'}
              className={active ? 'animate-dash' : ''}
              style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
            />
          )
        })}

        {/* Core connections */}
        {CONNECTIONS.map(({ from, to }, i) => {
          const active = activeId === from.id
          return (
            <line
              key={`core-${i}`}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={active ? from.color : 'rgba(255,255,255,0.07)'}
              strokeWidth={active ? 2 : 1}
              strokeDasharray={active ? '5 5' : '0'}
              className={active ? 'animate-dash' : ''}
              style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
            />
          )
        })}

        {/* Core node */}
        <g>
          <circle
            cx={CORE.x} cy={CORE.y} r={44}
            fill="none"
            stroke={activeId ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.3)'}
            strokeWidth={1}
            strokeDasharray="4 6"
            className="animate-ring"
            style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
          />
          <circle
            cx={CORE.x} cy={CORE.y} r={32}
            fill="rgba(8,9,12,0.95)"
            stroke="rgba(124,58,237,0.45)"
            strokeWidth={1.5}
          />
          <circle
            cx={CORE.x} cy={CORE.y} r={32}
            fill="url(#core-grd)"
          />
          <text
            x={CORE.x} y={CORE.y + 1}
            textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="11"
            fontFamily="'Outfit', sans-serif"
            fontWeight="700"
            letterSpacing="-0.5"
          >
            A
          </text>
          <text
            x={CORE.x} y={CORE.y + 14}
            textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.4)" fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
          >
            CORE
          </text>
          <defs>
            <radialGradient id="core-grd" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(167,139,250,0.25)" />
              <stop offset="100%" stopColor="rgba(124,58,237,0.08)" />
            </radialGradient>
          </defs>
        </g>
      </svg>

      {/* Department nodes (absolutely positioned over SVG) */}
      {NODES.map((node) => {
        const isActive = activeId === node.id
        const dept = DEPARTMENTS.find((d) => d.id === node.id)
        // Convert SVG coords to percent
        const left = (node.x / 560) * 100
        const top = (node.y / 460) * 100

        return (
          <button
            key={node.id}
            data-dept-color={node.color}
            data-dept-label={node.label}
            onClick={() => onSelect(node.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: isActive ? 96 : 80,
              height: isActive ? 80 : 68,
              background: isActive
                ? `linear-gradient(135deg, ${node.color}28, ${node.color}10)`
                : 'rgba(12,14,19,0.92)',
              border: `1.5px solid ${isActive ? node.color : `${node.color}28`}`,
              boxShadow: isActive
                ? `0 0 32px ${node.color}35, 0 0 80px ${node.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`
                : `0 0 12px ${node.color}12, inset 0 1px 0 rgba(255,255,255,0.04)`,
              transform: `translate(-50%, -50%) ${isActive ? 'scale(1.08)' : 'scale(1)'}`,
              zIndex: isActive ? 10 : 1,
              cursor: 'none',
            }}
            aria-pressed={isActive}
          >
            <div
              className="text-[10px] font-bold leading-none mb-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isActive ? node.color : `${node.color}70`,
              }}
            >
              {dept?.stat}
            </div>
            <div
              className="text-[12px] font-semibold leading-none"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
              }}
            >
              {node.label}
            </div>

            {/* Glow pulse (inactive) */}
            {!isActive && (
              <div
                className="absolute inset-0 rounded-2xl animate-breathe"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${node.color}08 0%, transparent 70%)`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

function BootSequence({ deptId, color }: { deptId: string; color: string }) {
  const [step, setStep] = useState(0)
  const steps = BOOT_STEPS[deptId] ?? []

  useEffect(() => {
    setStep(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 420 * (i + 1)))
    })
    return () => timers.forEach(clearTimeout)
  }, [deptId]) // eslint-disable-line react-hooks/exhaustive-deps

  const done = step >= steps.length

  return (
    <div className="space-y-2" style={{ animation: 'panel-up 0.5s var(--ease) both' }}>
      <p
        className="text-[10px] tracking-[0.2em] uppercase mb-4"
        style={{ fontFamily: "'JetBrains Mono', monospace", color, opacity: 0.7 }}
      >
        Initializing {deptId} department
      </p>
      {steps.slice(0, step).map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5"
          style={{ animation: 'boot-in 0.25s var(--ease) both' }}
        >
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}40` }}
          >
            {i === steps.length - 1 && done ? (
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            ) : (
              <CheckMark color={color} />
            )}
          </div>
          <span
            className="text-xs leading-snug"
            style={{
              color: i === steps.length - 1 ? color : 'rgba(255,255,255,0.50)',
              fontFamily: i === steps.length - 1 ? "'Outfit', sans-serif" : "'JetBrains Mono', monospace",
              fontWeight: i === steps.length - 1 ? 600 : 400,
              fontSize: i === steps.length - 1 ? '13px' : '11px',
            }}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  )
}

function DeptDetail({ deptId }: { deptId: string }) {
  const dept = DEPARTMENTS.find((d) => d.id === deptId)
  if (!dept) return null

  return (
    <div
      className="mt-6 grid sm:grid-cols-2 gap-6"
      style={{ animation: 'panel-up 0.5s var(--ease) 1.8s both' }}
    >
      {/* Tasks */}
      <div>
        <p
          className="text-[10px] tracking-[0.2em] uppercase mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: dept.hex, opacity: 0.6 }}
        >
          Tasks it handles
        </p>
        <ul className="space-y-2">
          {dept.tasks.map((task) => (
            <li key={task} className="flex items-start gap-2">
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${dept.hex}18` }}
              >
                <CheckMark color={dept.hex} />
              </div>
              <span className="text-white/48 text-xs leading-[1.6]">{task}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Integrations + stat */}
      <div>
        <p
          className="text-[10px] tracking-[0.2em] uppercase mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: dept.hex, opacity: 0.6 }}
        >
          Integrations
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {dept.integrations.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium"
              style={{
                background: `${dept.hex}10`,
                border: `1px solid ${dept.hex}25`,
                color: dept.hex,
                opacity: 0.85,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className="font-bold text-3xl"
            style={{ fontFamily: "'Outfit', sans-serif", color: dept.hex }}
          >
            {dept.stat}
          </span>
          <span className="text-white/30 text-xs">{dept.statLabel}</span>
        </div>
      </div>
    </div>
  )
}

export function DepartmentsSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [bootDone, setBootDone] = useState(false)

  const handleSelect = useCallback((id: string) => {
    if (activeId === id) {
      setActiveId(null)
      setBootDone(false)
      return
    }
    setActiveId(id)
    setBootDone(false)
    const steps = BOOT_STEPS[id] ?? []
    setTimeout(() => setBootDone(true), 420 * steps.length + 200)
  }, [activeId])

  const activeDept = DEPARTMENTS.find((d) => d.id === activeId)

  return (
    <section ref={ref} id="departments" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel color="rgba(79,209,197,0.9)">Your AI workforce</SectionLabel>
        <h2
          className="text-center font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Six departments.
          <br />
          <ScrollRevealText>One platform.</ScrollRevealText>
        </h2>
        <p className="text-center text-white/38 text-base max-w-lg mx-auto mb-14 leading-[1.65]">
          Each department is a team of autonomous agents — purpose-built, pre-trained, and ready to
          work from day one. Click one to activate it.
        </p>

        {/* Neural network */}
        <NeuralNetwork activeId={activeId} onSelect={handleSelect} />

        {/* Detail panel */}
        {activeId && activeDept && (
          <div
            key={activeId}
            className="mt-8 rounded-2xl p-7"
            style={{
              background: 'rgba(12,14,19,0.92)',
              border: `1.5px solid ${activeDept.hex}28`,
              boxShadow: `0 0 60px ${activeDept.hex}0e, inset 0 1px 0 rgba(255,255,255,0.05)`,
              animation: 'panel-up 0.5s var(--ease) both',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className="font-bold text-2xl"
                style={{ fontFamily: "'Outfit', sans-serif", color: activeDept.hex }}
              >
                {activeDept.name}
              </h3>
              <button
                onClick={() => setActiveId(null)}
                className="text-white/22 hover:text-white/55 transition-colors text-xl leading-none"
                aria-label="Close"
                style={{ cursor: 'none' }}
              >
                &times;
              </button>
            </div>

            <BootSequence deptId={activeId} color={activeDept.hex} />

            {bootDone && <DeptDetail deptId={activeId} />}
          </div>
        )}

        {!activeId && (
          <p
            className="text-center mt-6 text-white/22 text-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Click any department to activate it
          </p>
        )}
      </div>
    </section>
  )
}
