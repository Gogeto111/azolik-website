import { FOOTER_LINKS, SOCIAL_LINKS } from '../data'
import { AzoliKLogo } from './ui'
import { Mail } from 'lucide-react'

function SocialIcon({ name, href }: { name: string; href: string }) {
  const icons: Record<string, React.ReactNode> = {
    Email: <Mail size={18} />,
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/5"
      aria-label={name}
    >
      {icons[name]}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] pt-16 pb-10 px-6" style={{ background: '#08090c' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <AzoliKLogo size={32} />
              <span className="font-semibold text-white" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px' }}>
                azolic
              </span>
            </div>
            <p className="text-white/28 text-sm leading-[1.65] max-w-[240px]">
              Each project we undertake is a unique opportunity. Ready to transform your vision into reality?
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, items]) => (
            <div key={category}>
              <h4
                className="text-white/35 text-[10px] tracking-[0.22em] uppercase mb-4 font-medium"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/28 text-sm hover:text-white/55 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-7 gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-white/18 text-sm">© 2026 azolic™. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.name} name={social.icon} href={social.href} />
              ))}
            </div>
            <p className="text-white/14 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Terms & Conditions
              <span className="mx-2">·</span>
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}