import { useEffect, useRef, useState } from 'react'
import { HeroConsole } from '../HeroConsole'
import { GradientText } from '../ui'

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
      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx) return
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
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <GradientOrbs />
      <GridOverlay />
      <NoiseTexture />
    </div>
  )
}

function GradientOrbs() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute rounded-full blur-3xl opacity-20 animate-blob"
        style={{
          width: '600px', height: '600px',
          top: '-10%', left: '-10%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-20 animate-blob"
        style={{
          width: '500px', height: '500px',
          bottom: '-10%', right: '-10%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, transparent 70%)',
          animationDelay: '-3s',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-15 animate-blob"
        style={{
          width: '400px', height: '400px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(79,209,197,0.3) 0%, transparent 70%)',
          animationDelay: '-6s',
        }}
      />
    </div>
  )
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    />
  )
}

function NoiseTexture() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundSize: '200px 200px',
      }}
    />
  )
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-50 w-10 h-10 rounded-full border border-white/20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mix-blend-plus-lighter translate-x-[-50%] translate-y-[-50%] transition-transform duration-150 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(1)`,
      }}
      aria-hidden="true"
    />
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollTop / docHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 origin-left"
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left center',
      }}
      aria-hidden="true"
    />
  )
}

function Badge() {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70 backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span>Your first AI employee starts in 5 minutes</span>
    </div>
  )
}

function Headline() {
  return (
    <h1 className="mb-6 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
      <GradientText className="block">
        Your first employee starts
      </GradientText>
      <GradientText className="block">
        working in 5 minutes.
      </GradientText>
    </h1>
  )
}

function Subheadline() {
  return (
    <p className="mb-8 max-w-xl text-lg text-white/70 sm:text-xl">
      Hire an AI Marketing, Sales, Operations & Finance department before your coffee gets cold.
      No code. No hiring. Just results.
    </p>
  )
}

function CTAGroup() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href="#cta"
        className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/40 transition-all duration-200"
      >
        Hire Your AI Team
      </a>
      <a
        href="#how-it-works"
        className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white/90 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200"
      >
        See How It Works
      </a>
    </div>
  )
}

function TrustBar() {
  const logos = [
    { name: 'Stripe', color: '#635BFF' },
    { name: 'Vercel', color: '#000' },
    { name: 'Linear', color: '#5E6AD2' },
    { name: 'Notion', color: '#000' },
    { name: 'Supabase', color: '#3ECF8E' },
    { name: 'OpenAI', color: '#412991' },
  ]

  return (
    <div className="mt-12 flex flex-wrap items-center gap-8 opacity-40 text-sm font-medium text-white/50 sm:gap-12">
      <span className="mr-2">Trusted by teams at</span>
      {logos.map((logo) => (
        <span key={logo.name} style={{ color: logo.color }}>
          {logo.name}
        </span>
      ))}
    </div>
  )
}

function DepartmentBadges() {
  const departments = [
    { name: 'Marketing', icon: '📈', color: 'from-purple-500 to-pink-500' },
    { name: 'Sales', icon: '🤝', color: 'from-blue-500 to-cyan-500' },
    { name: 'Operations', icon: '⚙️', color: 'from-emerald-500 to-teal-500' },
    { name: 'Finance', icon: '💰', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      {departments.map((dept) => (
        <div
          key={dept.name}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r bg-white/5 px-4 py-2 backdrop-blur-sm"
        >
          <span className="text-xl">{dept.icon}</span>
          <span className="font-medium text-white/90">{dept.name}</span>
        </div>
      ))}
    </div>
  )
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-white/40">
      <span className="text-sm font-medium">Scroll to explore</span>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <Background />
        <AmbientBackground />
        <Cursor />
        <ScrollProgress />

        <div className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <div className="flex flex-col items-start">
              <Badge />
              <Headline />
              <Subheadline />
              <CTAGroup />
              <TrustBar />
              <DepartmentBadges />
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroConsole />
            </div>
          </div>
        </div>

        <ScrollHint />
      </div>
    </section>
  )
}