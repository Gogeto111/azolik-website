import { useEffect, useRef } from 'react'

/**
 * Parallax hook — moves an element on scroll at a given speed.
 * Speed 0.3 = moves 30% of scroll distance (background, slow).
 * Speed -0.2 = moves opposite direction (foreground pop).
 * Uses rAF + direct DOM writes — no React re-renders, no flicker.
 */
export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // How far the element center is from viewport center, as a fraction of viewport
      const elementCenter = rect.top + rect.height / 2
      const offsetFromCenter = (elementCenter - vh / 2) / vh
      const translate = offsetFromCenter * speed * 100
      el.style.transform = `translate3d(0, ${translate}px, 0)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
