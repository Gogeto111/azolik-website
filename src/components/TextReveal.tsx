import { useRef, useEffect, useState } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  style?: React.CSSProperties
}

export function TextReveal({ children, className = '', as: Tag = 'h2', style = {} }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const words = children.split(' ')

  return (
    // @ts-expect-error Tag is a valid HTML tag
    <Tag ref={ref} className={`text-reveal-container ${className}`} style={{ overflow: 'hidden', ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(100%)',
            transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms`,
            marginRight: '0.3em',
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
