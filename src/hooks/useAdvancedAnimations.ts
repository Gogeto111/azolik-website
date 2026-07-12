import { useRef, useEffect, useState, type RefObject } from 'react'

/* ─── Magnetic Mouse Follow ──────────────────────────── */
export function useMagnetic<T extends HTMLElement>(strength = 0.3): {
  ref: RefObject<T>
  style: React.CSSProperties
} {
  const ref = useRef<T>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setStyle({
        transform: `translate(${x * strength}px, ${y * strength}px)`,
        transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
      })
    }

    const onMouseLeave = () => {
      setStyle({
        transform: 'translate(0, 0)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      })
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength])

  return { ref, style }
}

/* ─── Depth Parallax (6D) ────────────────────────────── */
export function useDepthParallax<T extends HTMLElement>(
  layers: Array<{
    depth: number
    scale?: number
    rotateX?: number
    rotateY?: number
    translateZ?: number
  }>
): {
  ref: RefObject<T>
  transforms: string[]
} {
  const ref = useRef<T>(null)
  const [transforms, setTransforms] = useState<string[]>(
    layers.map(l => `translate3d(0, 0, ${l.translateZ || 0}px) scale(${l.scale || 1}) rotateX(${l.rotateX || 0}deg) rotateY(${l.rotateY || 0}deg)`)
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = (window.innerWidth / 2 - centerX) / (window.innerWidth / 2)
      const mouseY = (window.innerHeight / 2 - centerY) / (window.innerHeight / 2)

      const newTransforms = layers.map((layer, i) => {
        const depth = layer.depth
        const tx = mouseX * 30 * depth
        const ty = mouseY * 30 * depth
        const tz = layer.translateZ || 0
        const scale = layer.scale || 1
        const rx = (layer.rotateX || 0) + mouseY * 5 * depth
        const ry = (layer.rotateY || 0) + mouseX * 5 * depth
        return `translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)`
      })
      setTransforms(newTransforms)
      ticking = false
    }

    const onMouseMove = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [layers])

  return { ref, transforms }
}

/* ─── Scroll Reveal with Depth ───────────────────────── */
interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  onEnter?: () => void
  onExit?: () => void
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null)
  const { 
    threshold = 0.1, 
    rootMargin = '0px 0px -60px 0px', 
    triggerOnce = true,
    onEnter,
    onExit
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          onEnter?.()
          if (triggerOnce) obs.unobserve(el)
        } else {
          el.classList.remove('visible')
          onExit?.()
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, triggerOnce, onEnter, onExit])

  return ref
}

/* ─── Staggered Children Reveal ──────────────────────── */
export function useStaggerReveal<T extends HTMLElement>(
  childSelector: string = '> *',
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.querySelectorAll<HTMLElement>(childSelector))
    if (children.length === 0) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, childSelector])

  return ref
}

/* ─── Count Up Hook ──────────────────────────────────── */
export function useCountUp(target: number, duration = 1800, delay = 0): number {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (target === 0) return
    
    const timer = setTimeout(() => {
      const start = performance.now()
      const raf = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCurrent(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }, delay)

    return () => clearTimeout(timer)
  }, [target, duration, delay])

  return current
}

/* ─── Parallax Scroll Hook ───────────────────────────── */
export function useParallax<T extends HTMLElement>(
  speed: number,
  options: { x?: boolean; y?: boolean } = { x: false, y: true }
): RefObject<T> {
  const ref = useRef<T>(null)
  const { x = false, y = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false

    const update = () => {
      const scrollY = window.scrollY
      if (y) {
        el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`
      }
      if (x) {
        const scrollX = window.scrollX
        el.style.transform = `translate3d(${scrollX * speed}px, ${scrollY * speed}px, 0)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed, x, y])

  return ref
}

/* ─── Tilt Hook (Enhanced) ───────────────────────────── */
export function useTilt3D<T extends HTMLElement>(options: {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  easing?: string
  reset?: boolean
  glare?: boolean
  maxGlare?: number
} = {}): {
  ref: RefObject<T>
  onMouseMove: (e: React.MouseEvent<T>) => void
  onMouseLeave: (e: React.MouseEvent<T>) => void
  style: React.CSSProperties
} {
  const ref = useRef<T>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 0.1,
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
    reset = true,
    glare = false,
    maxGlare = 0.3
  } = options

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    const tiltX = y * maxTilt
    const tiltY = x * -maxTilt

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: `transform ${speed}s ${easing}`,
      ...(glare && {
        boxShadow: `0 0 ${40 * (Math.abs(x) + Math.abs(y)) / 2}px rgba(167,139,250,${maxGlare * (Math.abs(x) + Math.abs(y)) / 2})`
      })
    })
  }

  const onMouseLeave = () => {
    if (!reset) return
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform 0.6s ${easing}`,
      boxShadow: 'none'
    })
  }

  return { ref, onMouseMove, onMouseLeave, style }
}

/* ─── Spring Physics ─────────────────────────────────── */
export function useSpring(
  to: number,
  config: { stiffness?: number; damping?: number; mass?: number } = {}
): number {
  const [value, setValue] = useState(to)
  const { stiffness = 170, damping = 26, mass = 1 } = config

  useEffect(() => {
    let current = value
    let velocity = 0
    let raf: number

    const step = () => {
      const force = -stiffness * (current - to)
      const dampingForce = -damping * velocity
      const acceleration = (force + dampingForce) / mass
      velocity += acceleration * 16.67 / 1000
      current += velocity * 16.67 / 1000

      if (Math.abs(current - to) < 0.01 && Math.abs(velocity) < 0.01) {
        setValue(to)
        return
      }
      setValue(current)
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, stiffness, damping, mass])

  return value
}

/* ─── Intersection Observer Hook ─────────────────────── */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '0px', ...options }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, inView]
}

/* ─── Mouse Position Hook ────────────────────────────── */
export function useMousePosition(): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return position
}

/* ─── Window Size Hook ───────────────────────────────── */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

/* ─── Scroll Direction Hook ──────────────────────────── */
export function useScrollDirection(): 'up' | 'down' | null {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current) setDirection('down')
      else if (currentY < lastScrollY.current) setDirection('up')
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return direction
}

/* ─── Reduced Motion Hook ────────────────────────────── */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reduced
}

/* ─── Debounce Hook ──────────────────────────────────── */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

/* ─── Throttle Hook ──────────────────────────────────── */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttled, setThrottled] = useState(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const now = Date.now()
    if (now - lastRan.current >= limit) {
      setThrottled(value)
      lastRan.current = now
    } else {
      const timer = setTimeout(() => {
        setThrottled(value)
        lastRan.current = Date.now()
      }, limit - (now - lastRan.current))
      return () => clearTimeout(timer)
    }
  }, [value, limit])

  return throttled
}