import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data'
import { useMagnetic } from '../hooks/useAdvancedAnimations'
import { AzoliKLogo } from './ui'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const magnetic = useMagnetic<HTMLAnchorElement>(0.25)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(8,9,12,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group" aria-label="Azolic home">
          <AzoliKLogo size={36} />
          <span
            className="font-semibold text-lg text-white tracking-[-0.02em] group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Azolic
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={link.cta
                ? 'hidden md:flex shimmer-btn ripple px-5 py-2.5 rounded-lg text-sm font-semibold text-[#08090c] transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]'
                : 'text-sm text-white/55 hover:text-white/90 transition-colors duration-200 font-medium'}
              style={link.cta
                ? {
                    background: '#f5f5f7',
                    boxShadow: '0 0 40px rgba(245,245,247,0.14), 0 8px 32px rgba(0,0,0,0.3)',
                  }
                : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t border-white/[0.06] py-4 px-6"
          style={{ background: 'rgba(8,9,12,0.98)', backdropFilter: 'blur(24px)' }}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-white/65 hover:text-white transition-colors text-base border-b border-white/[0.04] last:border-0 ${link.cta ? 'mt-4 pt-4 border-t border-white/[0.06]' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}