import { useDepthParallax } from '../hooks/useAdvancedAnimations'
import { useCountUp } from '../hooks/useCountUp'
import { useState, useEffect, useRef } from 'react'
import React, { type ReactElement } from 'react'
import { createPortal } from 'react-dom'

/* ─── Page Transition Overlay ─────────────────────────── */
export function PageTransition({ children, isLoading = false }: { 
  children: React.ReactNode 
  isLoading?: boolean 
}) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayClass, setOverlayClass] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    if (isLoading) {
      setShowOverlay(true)
      setOverlayClass('enter')
      const timer = setTimeout(() => {
        setOverlayClass('exit')
        setTimeout(() => setShowOverlay(false), 600)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const overlay = (
    <div
      className={`page-transition-overlay ${overlayClass}`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#4fd1c5" />
              </linearGradient>
            </defs>
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="url(#loader-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="160"
              strokeDashoffset="160"
              className="animate-dash"
              style={{ animationDuration: '1.5s' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg" style={{ 
              background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
              animation: 'float-y 1.5s ease-in-out infinite' 
            }} />
          </div>
        </div>
        <p className="text-white/40 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Initializing AI workforce...
        </p>
      </div>
    </div>
  )

  return (
    <>
      {children}
      {showOverlay && createPortal(overlay, document.body)}
    </>
  )
}

/* ─── Section Transition Wrapper ───────────────────────── */
interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  entrance?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'scale-down' | 'flip-x' | 'flip-y' | 'rotate-in' | 'slide-rotate'
  delay?: number
  stagger?: number
}

export function SectionTransition({ 
  children, 
  className = '', 
  entrance = 'fade-up',
  delay = 0,
  stagger = 80
}: SectionTransitionProps) {
  const entranceClasses = {
    'fade-up': 'entrance-fade-up',
    'fade-down': 'entrance-fade-down',
    'fade-left': 'entrance-fade-left',
    'fade-right': 'entrance-fade-right',
    'scale-up': 'entrance-scale-up',
    'scale-down': 'entrance-scale-down',
    'flip-x': 'entrance-flip-x',
    'flip-y': 'entrance-flip-y',
    'rotate-in': 'entrance-rotate-in',
    'slide-rotate': 'entrance-slide-rotate',
  }

  const childArray = Array.isArray(children) ? children : [children]
  
  return (
    <div className={`reveal-stagger ${className}`}>
      {childArray.map((child, i) => 
        React.isValidElement(child) ? (
          React.cloneElement(child as ReactElement, {
            className: `${(child.props.className || '')} ${entranceClasses[entrance]} stagger-${i + 1}`.trim(),
            style: {
              ...(child.props.style || {}),
              animationDelay: `${delay + i * stagger}ms`
            }
          })
        ) : child
      )}
    </div>
  )
}

/* ─── Magnetic Wrapper ─────────────────────────────────── */
import { useMagnetic } from '../hooks/useAdvancedAnimations'

interface MagneticProps {
  children: React.ReactElement
  strength?: number
}

export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const { ref, style } = useMagnetic<HTMLElement>(strength)
  
  return React.cloneElement(children, {
    ref,
    style: { ...children.props.style, ...style },
    className: `${children.props.className || ''} magnetic`.trim()
  })
}

/* ─── Ripple Button ────────────────────────────────────── */
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function RippleButton({ children, className = '', ...props }: RippleButtonProps) {
  return (
    <button
      className={`ripple btn-press ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/* ─── Glowing Border Card ──────────────────────────────── */
interface GlowCardProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function GlowCard({ children, className = '', color = '#a78bfa' }: GlowCardProps) {
  const glowStyle = color ? {
    '--glow-color': color,
    boxShadow: `0 0 0 0 ${color}40, inset 0 0 0 0 ${color}15`
  } : {}
  
  return (
    <div 
      className={`animate-border-glow rounded-2xl ${className}`}
      style={glowStyle}
    >
      {children}
    </div>
  )
}

/* ─── Floating Label Input ─────────────────────────────── */
interface FloatingLabelProps {
  label: string
  type?: 'text' | 'email' | 'password' | 'textarea'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  name?: string
  required?: boolean
  error?: string
}

export function FloatingLabelInput({ 
  label, 
  type = 'text', 
  placeholder: _placeholder, 
  value, 
  onChange, 
  name,
  required,
  error 
}: FloatingLabelProps) {
  const isTextarea = type === 'textarea'
  
  return (
    <div className="floating-label-group relative">
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder=" "
          name={name}
          required={required}
          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border transition-colors duration-200 text-white placeholder-white/0 focus:outline-none resize-none"
          style={{
            borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.07)',
            minHeight: '100px'
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          name={name}
          required={required}
          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border transition-colors duration-200 text-white placeholder-white/0 focus:outline-none"
          style={{
            borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.07)'
          }}
        />
      )}
      <label>{label}</label>
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── Tooltip Wrapper ──────────────────────────────────── */
interface TooltipProps {
  children: React.ReactElement
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  return (
    <span 
      className="tooltip-trigger" 
      data-tooltip={content}
      style={{ 
        '--tooltip-pos': position 
      }}
    >
      {children}
    </span>
  )
}

/* ─── Scroll Progress Ring ─────────────────────────────── */
export function ScrollProgressRing() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollTop / docHeight)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const circumference = 2 * Math.PI * 22
  const offset = circumference * (1 - progress)

  return (
    <div className="scroll-ring" aria-hidden="true">
      <svg viewBox="0 0 56 56">
        <defs>
          <linearGradient id="scroll-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <circle className="bg" cx="28" cy="28" r="22" />
        <circle 
          className="fg" 
          cx="28" 
          cy="28" 
          r="22" 
          style={{ strokeDashoffset: offset }}
        />
      </svg>
    </div>
  )
}

/* ─── Depth Parallax Wrapper ───────────────────────────── */
interface DepthParallaxProps {
  children: React.ReactNode
  className?: string
  layers?: Array<{
    depth: number
    scale?: number
    rotateX?: number
    rotateY?: number
    translateZ?: number
    className?: string
  }>
}

export function DepthParallax({ 
  children, 
  className = '',
  layers = [
    { depth: 0, scale: 1.2, translateZ: -100 },
    { depth: 0.3, scale: 1.1, translateZ: -50 },
    { depth: 0.6, scale: 1, translateZ: 0 },
    { depth: 0.8, scale: 0.95, translateZ: 50 },
    { depth: 1, scale: 0.9, translateZ: 100 }
  ]
}: DepthParallaxProps) {
  const { ref, transforms } = useDepthParallax<HTMLDivElement>(layers)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {transforms.map((transform, i) => (
        <div 
          key={i} 
          className={`absolute inset-0 ${layers[i]?.className || ''}`}
          style={{ 
            transform, 
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {i === 2 ? children : null}
        </div>
      ))}
    </div>
  )
}

/* ─── Animated Counter ─────────────────────────────────── */
interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
  delay?: number
}

export function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '', 
  className = '', 
  duration = 1800, 
  delay = 0 
}: AnimatedCounterProps) {
  const count = useCountUp(value, duration, delay)
  
  return (
    <span className={`animate-count-up ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* ─── Skeleton Loader ──────────────────────────────────── */
interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  className?: string
}

export function Skeleton({ 
  width = '100%', 
  height = '16px', 
  borderRadius = '8px', 
  className = '' 
}: SkeletonProps) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  )
}

/* ─── Image Reveal ─────────────────────────────────────── */
interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function ImageReveal({ src, alt, className = '', width, height }: ImageRevealProps) {
  return (
    <div className={`image-reveal ${className}`} style={{ width, height }}>
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
    </div>
  )
}

/* ─── Morphing Shape ───────────────────────────────────── */
interface MorphingShapeProps {
  className?: string
  color?: string
  size?: number
}

export function MorphingShape({ className = '', color = '#a78bfa', size = 200 }: MorphingShapeProps) {
  return (
    <div 
      className={`animate-morph ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}33, ${color}08)`,
        border: `1px solid ${color}22`,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      }}
    />
  )
}

/* ─── Text Reveal (character by character) ─────────────── */
interface TextRevealProps {
  children: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({ children, className = '', tag = 'span' }: TextRevealProps) {
  const chars = children.split('').map((char, i) => 
    <span key={i} style={{ display: 'inline-block' }}>{char === ' ' ? '\u00A0' : char}</span>
  )
  
  return (
    <tag className={`text-reveal ${className}`}>
      {chars}
    </tag>
  )
}

/* ─── Gradient Border Button ───────────────────────────── */
interface GradBorderBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function GradBorderButton({ children, className = '', ...props }: GradBorderBtnProps) {
  return (
    <button
      className={`grad-border-btn px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}