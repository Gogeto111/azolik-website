import type { ReactNode, CSSProperties, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  style?: CSSProperties
}

export function GlassCard({ children, className = '', style = {}, ...rest }: Props) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${className}`}
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)', ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

export function GradientText({
  children,
  className = '',
  animated = false,
}: {
  children: ReactNode
  className?: string
  animated?: boolean
}) {
  return (
    <span
      className={`${animated ? 'gradient-flow-text' : ''} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #4fd1c5 0%, #a78bfa 45%, #fb923c 100%)',
        backgroundSize: animated ? '200% auto' : 'auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  )
}

export function SectionLabel({
  children,
  color = 'rgba(167,139,250,0.9)',
}: {
  children: ReactNode
  color?: string
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <span
        className="w-8 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color})` }}
      />
      <p
        className="text-center text-[11px] tracking-[0.22em] uppercase font-medium"
        style={{ fontFamily: "'JetBrains Mono', monospace", color }}
      >
        {children}
      </p>
      <span
        className="w-8 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${color})` }}
      />
    </div>
  )
}

export function AzoliKLogo({ size = 28, className = '', ...rest }: { size?: number; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
        boxShadow: '0 0 16px rgba(124,58,237,0.3)',
      }}
      {...rest}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.95" />
        <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.55" />
        <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.55" />
        <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.25" />
      </svg>
    </div>
  )
}

export function CheckMark({ color }: { color: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path
        d="M1.5 4.5L3.8 7L7.5 2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}