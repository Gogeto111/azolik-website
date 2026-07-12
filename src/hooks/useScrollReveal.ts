import { useEffect, useRef, type RefObject } from 'react'

export function useScrollReveal<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}
