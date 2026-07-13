import { useEffect, useRef, useState, useCallback } from 'react'
import { HeroConsole } from './HeroConsole'

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC HERO — Azolik
   Pure black · Particles · Logo reveal · HUD · Fog · Grain
   ═══════════════════════════════════════════════════════════════ */

const COLORS = {
  cyan: '#2EE8FF',
  skyBlue: '#49C7FF',
  sapphire: '#5A78FF',
  indigo: '#4B46E5',
  white: '#ffffff',
  black: '#000000',
}

const AGENTS = [
  { name: 'SUPPORT', color: COLORS.cyan },
  { name: 'SALES', color: COLORS.sapphire },
  { name: 'FINANCE', color: COLORS.skyBlue },
  { name: 'OPERATIONS', color: COLORS.indigo },
]

const BOOT_LOG = [
  '> azolik v3.0 — initializing core',
  '> loading AI departments...',
  '> SUPPORT agent [online]',
  '> SALES agent [online]',
  '> FINANCE agent [online]',
  '> OPERATIONS agent [online]',
  '> all systems operational',
  '> welcome.',
]

const PHASE_TIMING = {
  fadeFromBlack: 0,
  bootStart: 800,
  bootEnd: 3200,
  agentStart: 3400,
  agentEnd: 5200,
  logoWireStart: 5500,
  logoWireEnd: 7500,
  logoMaterialStart: 7800,
  logoMaterialEnd: 9800,
  pause: 10000,
  impact: 10800,
  revealStart: 11200,
  wordmarkStart: 11800,
  taglineStart: 12400,
  holdEnd: 14500,
  fadeOut: 15000,
  done: 16000,
}

/* ─── Canvas Particle System ──────────────────────────────── */
function ParticleCanvas({ phase }: { phase: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    const particleCount = Math.min(40, Math.floor((w * h) / 25000))
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.05,
      color: [COLORS.cyan, COLORS.skyBlue, COLORS.sapphire, COLORS.indigo][
        Math.floor(Math.random() * 4)
      ],
    }))

    const sparks: Array<{
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number
    }> = []

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const currentPhase = phaseRef.current
      const globalAlpha = currentPhase >= PHASE_TIMING.done ? 0 : 1

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity * globalAlpha
        ctx.fill()
      })

      sparks.forEach((s, i) => {
        s.x += s.vx
        s.y += s.vy
        s.life--
        const lifeRatio = s.life / s.maxLife
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.2 * lifeRatio, 0, Math.PI * 2)
        ctx.fillStyle = COLORS.cyan
        ctx.globalAlpha = lifeRatio * 0.8 * globalAlpha
        ctx.fill()
        if (s.life <= 0) sparks.splice(i, 1)
      })

      if (currentPhase >= PHASE_TIMING.impact && currentPhase < PHASE_TIMING.impact + 500) {
        for (let i = 0; i < 3; i++) {
          sparks.push({
            x: w / 2 + (Math.random() - 0.5) * 200,
            y: h / 2 + (Math.random() - 0.5) * 200,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 30 + Math.random() * 20,
            maxLife: 50,
          })
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

/* ─── Fog Layers ──────────────────────────────────────────── */
function FogLayers({ phase }: { phase: number }) {
  const opacity = phase >= PHASE_TIMING.done ? 0 : 1
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity }}>
      <div
        className="absolute w-[120%] h-[60%] -left-[10%] top-[10%]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(46,232,255,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'fogDrift1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[100%] h-[50%] -left-[5%] bottom-[5%]"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(90,120,255,0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'fogDrift2 25s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/* ─── God Rays ────────────────────────────────────────────── */
function GodRays({ phase }: { phase: number }) {
  const visible = phase >= PHASE_TIMING.logoWireStart && phase < PHASE_TIMING.done
  const opacity = visible
    ? phase >= PHASE_TIMING.impact
      ? 0.12
      : 0.06
    : 0
  return (
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity }}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          className="absolute left-1/2 top-1/2 w-[2px] origin-top"
          style={{
            height: '60vh',
            transform: `translate(-50%, 0) rotate(${deg}deg)`,
            background: `linear-gradient(to bottom, ${COLORS.cyan}15, transparent)`,
            filter: 'blur(4px)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Film Grain ──────────────────────────────────────────── */
function FilmGrain({ phase }: { phase: number }) {
  if (phase >= PHASE_TIMING.done) return null
  return (
    <div
      className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay"
      style={{
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        animation: 'grainShift 0.1s steps(2) infinite',
      }}
    />
  )
}

/* ─── Vignette ────────────────────────────────────────────── */
function Vignette({ phase }: { phase: number }) {
  if (phase >= PHASE_TIMING.done) return null
  return (
    <div
      className="absolute inset-0 pointer-events-none z-40"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }}
    />
  )
}

/* ─── Letterbox Bars ──────────────────────────────────────── */
function Letterbox({ phase }: { phase: number }) {
  const visible = phase >= PHASE_TIMING.impact && phase < PHASE_TIMING.done
  const height = visible ? '8vh' : '0'
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full bg-black z-50 transition-all duration-1000"
        style={{ height }}
      />
      <div
        className="absolute bottom-0 left-0 w-full bg-black z-50 transition-all duration-1000"
        style={{ height }}
      />
    </>
  )
}

/* ─── Animated Logo ───────────────────────────────────────── */
function AnimatedLogo({ phase }: { phase: number }) {
  const wireOpacity =
    phase >= PHASE_TIMING.logoWireStart
      ? Math.min(1, (phase - PHASE_TIMING.logoWireStart) / 800)
      : 0

  const materialOpacity =
    phase >= PHASE_TIMING.logoMaterialStart
      ? Math.min(1, (phase - PHASE_TIMING.logoMaterialStart) / 1200)
      : 0

  const coreGlow =
    phase >= PHASE_TIMING.logoWireStart
      ? Math.min(1, (phase - PHASE_TIMING.logoWireStart) / 2000)
      : 0

  const impactFlash =
    phase >= PHASE_TIMING.impact && phase < PHASE_TIMING.impact + 400
      ? 1 - (phase - PHASE_TIMING.impact) / 400
      : 0

  const scale =
    phase >= PHASE_TIMING.impact && phase < PHASE_TIMING.impact + 300
      ? 1 + 0.15 * (1 - (phase - PHASE_TIMING.impact) / 300)
      : phase >= PHASE_TIMING.logoWireStart
        ? 0.85 + 0.15 * Math.min(1, (phase - PHASE_TIMING.logoWireStart) / 3000)
        : 0

  const showLogo = phase >= PHASE_TIMING.logoWireStart && phase < PHASE_TIMING.done

  if (!showLogo) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      {/* Impact flash */}
      {impactFlash > 0 && (
        <div
          className="absolute inset-0 z-60"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${COLORS.white}${Math.round(impactFlash * 90).toString(16).padStart(2, '0')}, transparent 60%)`,
          }}
        />
      )}

      {/* Shockwave ring */}
      {phase >= PHASE_TIMING.impact && phase < PHASE_TIMING.impact + 800 && (
        <div
          className="absolute rounded-full border"
          style={{
            width: `${80 + ((phase - PHASE_TIMING.impact) / 800) * 500}px`,
            height: `${80 + ((phase - PHASE_TIMING.impact) / 800) * 500}px`,
            borderColor: `rgba(46,232,255,${0.5 * (1 - (phase - PHASE_TIMING.impact) / 800)})`,
            boxShadow: `0 0 40px rgba(46,232,255,${0.3 * (1 - (phase - PHASE_TIMING.impact) / 800)})`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      )}

      {/* Main logo container */}
      <div
        className="relative"
        style={{
          transform: `scale(${scale})`,
          transition: 'none',
        }}
      >
        {/* Arc-reactor core glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '180px',
            height: '180px',
            background: `radial-gradient(circle, ${COLORS.cyan}${Math.round(coreGlow * 40).toString(16).padStart(2, '0')}, ${COLORS.sapphire}${Math.round(coreGlow * 20).toString(16).padStart(2, '0')}, transparent 70%)`,
            filter: `blur(30px)`,
          }}
        />

        {/* Wireframe logo (SVG triangle / A shape) */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="relative z-10"
          style={{ opacity: wireOpacity * (1 - materialOpacity * 0.7) }}
        >
          <defs>
            <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.8" />
              <stop offset="50%" stopColor={COLORS.skyBlue} stopOpacity="0.6" />
              <stop offset="100%" stopColor={COLORS.sapphire} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Wireframe A / triangle */}
          <polygon
            points="80,12 148,140 12,140"
            fill="none"
            stroke="url(#wireGrad)"
            strokeWidth="1.5"
            strokeDasharray="400"
            strokeDashoffset={Math.max(0, 400 - wireOpacity * 400)}
            style={{ transition: 'stroke-dashoffset 2s ease' }}
          />
          <line
            x1="40"
            y1="100"
            x2="120"
            y2="100"
            stroke="url(#wireGrad)"
            strokeWidth="1.2"
            opacity={wireOpacity}
          />
          {/* Blueprint grid lines */}
          {wireOpacity < 0.9 &&
            Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={20 * i}
                x2="160"
                y2={20 * i}
                stroke={COLORS.cyan}
                strokeWidth="0.3"
                opacity={0.15 * (1 - materialOpacity)}
              />
            ))}
          {wireOpacity < 0.9 &&
            Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={20 * i}
                y1="0"
                x2={20 * i}
                y2="160"
                stroke={COLORS.cyan}
                strokeWidth="0.3"
                opacity={0.15 * (1 - materialOpacity)}
              />
            ))}
        </svg>

        {/* Material / titanium logo */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="absolute left-0 top-0 z-10"
          style={{ opacity: materialOpacity }}
        >
          <defs>
            <linearGradient id="titanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e0e0" />
              <stop offset="30%" stopColor="#f8f8f8" />
              <stop offset="50%" stopColor="#c0c0c0" />
              <stop offset="70%" stopColor="#f0f0f0" />
              <stop offset="100%" stopColor="#d0d0d0" />
            </linearGradient>
            <filter id="glassEffect">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            </filter>
          </defs>
          <polygon
            points="80,12 148,140 12,140"
            fill="url(#titanGrad)"
            filter="url(#glassEffect)"
          />
          <line
            x1="40"
            y1="100"
            x2="120"
            y2="100"
            stroke="#b0b0b0"
            strokeWidth="1.5"
          />
          {/* Specular sweep */}
          {materialOpacity > 0.3 && (
            <rect
              x="0"
              y="0"
              width="160"
              height="160"
              fill="url(#specularSweep)"
              opacity={0.15}
            />
          )}
          <defs>
            <linearGradient
              id="specularSweep"
              x1={`${((phase - PHASE_TIMING.logoMaterialStart) / 2000) * 200 - 50}%`}
              y1="0%"
              x2={`${((phase - PHASE_TIMING.logoMaterialStart) / 2000) * 200 - 30}%`}
              y2="100%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="45%" stopColor="white" stopOpacity="0.4" />
              <stop offset="55%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* Edge glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '200px',
            height: '200px',
            border: `1px solid rgba(46,232,255,${materialOpacity * 0.2})`,
            boxShadow: `0 0 60px rgba(46,232,255,${materialOpacity * 0.15}), inset 0 0 40px rgba(90,120,255,${materialOpacity * 0.08})`,
          }}
        />

        {/* Contact shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '-30px',
            width: '120px',
            height: '20px',
            background: `radial-gradient(ellipse, rgba(46,232,255,${materialOpacity * 0.15}) 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  )
}

/* ─── HUD Elements ────────────────────────────────────────── */
function HudElements({ phase }: { phase: number }) {
  const agentsVisible = phase >= PHASE_TIMING.agentStart && phase < PHASE_TIMING.done
  const bootVisible = phase >= PHASE_TIMING.bootStart && phase < PHASE_TIMING.agentEnd + 500
  const showHint = phase >= PHASE_TIMING.holdEnd - 1000 && phase < PHASE_TIMING.done

  const visibleBootLines =
    phase >= PHASE_TIMING.bootStart
      ? Math.min(
          BOOT_LOG.length,
          Math.floor(((phase - PHASE_TIMING.bootStart) / (PHASE_TIMING.bootEnd - PHASE_TIMING.bootStart)) * BOOT_LOG.length) + 1
        )
      : 0

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {/* Agent labels — top center */}
      <div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 flex gap-4"
        style={{
          opacity: agentsVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        {AGENTS.map((agent, i) => {
          const delay = i * 200
          const agentProgress = agentsVisible
            ? Math.min(1, Math.max(0, (phase - PHASE_TIMING.agentStart - delay) / 600))
            : 0
          return (
            <div
              key={agent.name}
              className="flex flex-col items-center gap-1"
              style={{
                opacity: agentProgress,
                transform: `translateY(${(1 - agentProgress) * 10}px)`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: agent.color,
                  boxShadow: `0 0 12px ${agent.color}80`,
                  animation: agentsVisible ? 'corePulse 2s ease-in-out infinite' : 'none',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{
                  color: agent.color,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {agent.name}
              </span>
            </div>
          )
        })}
      </div>

      {/* Boot log — bottom center */}
      <div
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 max-w-md w-full px-4"
        style={{ opacity: bootVisible ? 0.6 : 0, transition: 'opacity 0.5s ease' }}
      >
        <div className="space-y-1">
          {BOOT_LOG.slice(0, visibleBootLines).map((line, i) => (
            <div
              key={i}
              className="text-[11px] text-left"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color:
                  i === visibleBootLines - 1
                    ? COLORS.cyan
                    : 'rgba(255,255,255,0.3)',
                animation: 'bootLineIn 0.3s ease forwards',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Status hint — bottom right */}
      <div
        className="absolute bottom-[8%] right-[5%] flex items-center gap-4"
        style={{
          opacity: showHint ? 0.4 : 0,
          transition: 'opacity 0.5s ease',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <span>M Mute</span>
        <span>Space Replay</span>
      </div>
    </div>
  )
}

/* ─── Branding Text ───────────────────────────────────────── */
function BrandingText({ phase }: { phase: number }) {
  const logoDelay = phase >= PHASE_TIMING.revealStart ? Math.min(1, (phase - PHASE_TIMING.revealStart) / 600) : 0
  const wordmarkDelay = phase >= PHASE_TIMING.wordmarkStart ? Math.min(1, (phase - PHASE_TIMING.wordmarkStart) / 600) : 0
  const taglineDelay = phase >= PHASE_TIMING.taglineStart ? Math.min(1, (phase - PHASE_TIMING.taglineStart) / 800) : 0
  const fadeOut = phase >= PHASE_TIMING.fadeOut ? Math.max(0, 1 - (phase - PHASE_TIMING.fadeOut) / 1000) : 1

  const show = phase >= PHASE_TIMING.revealStart && phase < PHASE_TIMING.done

  if (!show) return null

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-35 pointer-events-none"
      style={{ opacity: fadeOut }}
    >
      {/* AZOLIK wordmark */}
      <div
        className="mt-[240px] text-center"
        style={{
          opacity: wordmarkDelay,
          transform: `translateY(${(1 - wordmarkDelay) * 20}px)`,
        }}
      >
        <h1
          className="font-bold tracking-[0.5em] text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            letterSpacing: '0.5em',
          }}
        >
          AZOLIK
        </h1>
      </div>

      {/* Subtitle */}
      <div
        className="mt-4 text-center"
        style={{
          opacity: taglineDelay,
          transform: `translateY(${(1 - taglineDelay) * 12}px)`,
        }}
      >
        <p
          className="text-white/60 font-light tracking-wide"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 20px)',
          }}
        >
          Your AI Team. Already at Work.
        </p>
      </div>

      {/* Caption */}
      <div
        className="mt-3 text-center"
        style={{
          opacity: taglineDelay * 0.7,
          transform: `translateY(${(1 - taglineDelay) * 8}px)`,
        }}
      >
        <p
          className="text-white/30 tracking-[0.25em] uppercase"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(9px, 1.2vw, 12px)',
          }}
        >
          SIX DEPARTMENTS · ONE INTELLIGENCE
        </p>
      </div>
    </div>
  )
}

/* ─── Exposure Layer ──────────────────────────────────────── */
function ExposureLayer({ phase }: { phase: number }) {
  if (phase < PHASE_TIMING.fadeFromBlack + 1200 || phase >= PHASE_TIMING.done) return null

  const t = Math.min(1, (phase - PHASE_TIMING.fadeFromBlack) / 1200)
  return (
    <div
      className="absolute inset-0 bg-black pointer-events-none z-55"
      style={{ opacity: 1 - t }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export function Hero() {
  const [phase, setPhase] = useState(0)
  const [muted, setMuted] = useState(false)
  const startTime = useRef<number>(0)
  const rafRef = useRef<number>(0)

  const frameCount = useRef(0)
  const tick = useCallback(() => {
    frameCount.current++
    if (frameCount.current % 2 === 0) {
      const elapsed = performance.now() - startTime.current
      setPhase(elapsed)
    }
    const elapsed = performance.now() - startTime.current
    if (elapsed < PHASE_TIMING.done + 500) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [])

  useEffect(() => {
    startTime.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const handleReplay = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    startTime.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        handleReplay()
      }
      if (e.key === 'm' || e.key === 'M') {
        setMuted((m) => !m)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleReplay])

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <ParticleCanvas phase={phase} />
      <FogLayers phase={phase} />
      <GodRays phase={phase} />
      <AnimatedLogo phase={phase} />
      <BrandingText phase={phase} />
      <HudElements phase={phase} />
      <Letterbox phase={phase} />
      <Vignette phase={phase} />
      <FilmGrain phase={phase} />
      <ExposureLayer phase={phase} />
      {phase > PHASE_TIMING.holdEnd && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          style={{
            opacity: Math.min(1, (phase - PHASE_TIMING.holdEnd) / 1000),
            transform: `translateX(-50%) translateY(${Math.max(0, 20 - ((phase - PHASE_TIMING.holdEnd) / 1000) * 20)}px)`,
          }}
        >
          <HeroConsole />
        </div>
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND — Aurora blobs + canvas particles + grid
   ═══════════════════════════════════════════════════════════════ */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const palette = ['#4fd1c5', '#a78bfa', '#fb923c', '#34d399', '#60a5fa', '#f472b6']
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.15 + 0.03,
      color: palette[Math.floor(Math.random() * palette.length)],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x * canvas.width
      const my = mouse.current.y * canvas.height

      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 300)
      grd.addColorStop(0, 'rgba(167,139,250,0.028)')
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const update = () => {
      const sy = window.scrollY
      const mx = (mouse.current.x - 0.5) * 2
      const my = (mouse.current.y - 0.5) * 2

      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate3d(${-sy * 0.15 + mx * 20}px, ${-sy * 0.1 + my * 15}px, 0)`
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate3d(${sy * 0.12 - mx * 25}px, ${-sy * 0.08 - my * 20}px, 0)`
      if (blob3Ref.current)
        blob3Ref.current.style.transform = `translate3d(${mx * 30}px, ${-sy * 0.06 + my * 25}px, 0)`
      if (gridRef.current)
        gridRef.current.style.transform = `translate3d(${mx * 10}px, ${-sy * 0.04 + my * 8}px, 0)`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    const onMouse = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        ref={blob1Ref}
        className="absolute rounded-full animate-aurora"
        style={{
          width: '1000px', height: '1000px',
          top: '-25%', left: '-12%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute rounded-full animate-aurora"
        style={{
          width: '800px', height: '800px',
          top: '8%', right: '-10%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)',
          animationDelay: '-5s',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob3Ref}
        className="absolute rounded-full animate-aurora"
        style={{
          width: '600px', height: '600px',
          bottom: '22%', left: '28%',
          background: 'radial-gradient(circle, rgba(79,209,197,0.07) 0%, transparent 65%)',
          animationDelay: '-9s',
          willChange: 'transform',
        }}
      />
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.016]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}
