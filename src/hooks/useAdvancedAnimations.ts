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
