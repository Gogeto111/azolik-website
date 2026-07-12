import { useEffect, useRef } from 'react'
import { HeroConsole } from './HeroConsole'
import { GradientText } from './ui'

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

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = 'rgba(167,139,250,0.035)'
            ctx.globalAlpha = 1 - dist / 110
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Parallax for blobs + grid — rAF, no re-renders
  useEffect(() => {
    let ticking = false

    const update = () => {
      const sy = window.scrollY
      const mx = (mouse.current.x - 0.5) * 2
      const my = (mouse.current.y - 0.5) * 2

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${-sy * 0.15 + mx * 20}px, ${-sy * 0.1 + my * 15}px, 0)`
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${sy * 0.12 - mx * 25}px, ${-sy * 0.08 - my * 20}px, 0)`
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${mx * 30}px, ${-sy * 0.06 + my * 25}px, 0)`
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${mx * 10}px, ${-sy * 0.04 + my * 8}px, 0)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    // Mouse-driven parallax
    const onMouse = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
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

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left */}
          <div className="flex flex-col items-start">
            <div
              className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
              style={{
                borderColor: 'rgba(167,139,250,0.3)',
                background: 'rgba(167,139,250,0.08)',
                color: '#c4b5fd',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-badge-pulse" />
              Now in open beta
            </div>

            <h1
              className="font-bold leading-[0.95] tracking-[-0.04em]"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(56px, 7.5vw, 96px)' }}
            >
              <GradientText animated>Your full</GradientText>
              <br />
              <GradientText animated>AI team.</GradientText>
              <br />
              <span className="text-white">Day one.</span>
            </h1>

            <p
              className="mt-8 text-white/48 leading-[1.7] max-w-md"
              style={{ fontSize: 'clamp(16px, 1.8vw, 19px)' }}
            >
              Six AI departments that do the boring stuff for you — Sales, Support, Marketing,
              Finance, Operations, HR. They never sleep, never complain, and never ask for a raise.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://azolik.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="shimmer-btn group px-7 py-3.5 rounded-xl text-base font-semibold text-[#08090c] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: '#f5f5f7',
                  boxShadow: '0 0 40px rgba(245,245,247,0.14), 0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <span className="flex items-center gap-2">
                  Hire Your AI Team
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="#08090c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-white/28 text-sm flex-wrap">
              {['Solo: 6 months free', 'No credit card', 'Live in 48 hours'].map((t, i) => (
                <span key={t} className="flex items-center gap-1.5">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {[
                { name: 'Support', color: '#4fd1c5' },
                { name: 'Sales', color: '#a78bfa' },
                { name: 'Marketing', color: '#fb923c' },
                { name: 'Finance', color: '#34d399' },
                { name: 'Operations', color: '#60a5fa' },
                { name: 'HR', color: '#f472b6' },
              ].map((d) => (
                <span
                  key={d.name}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: `${d.color}12`,
                    border: `1px solid ${d.color}28`,
                    color: d.color,
                  }}
                >
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Console */}
          <div className="flex justify-center lg:justify-end">
            <HeroConsole />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <span className="text-xs text-white/50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
