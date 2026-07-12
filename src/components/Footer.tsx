import { AzoliKLogo } from './ui'

const FOOTER_LINKS: Record<string, string[]> = {
  Product: ['AI Departments', 'Industries', 'Integrations', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Documentation', 'Status', 'Security', 'Privacy', 'Terms'],
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.05] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <AzoliKLogo />
              <span
                className="font-semibold text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                AzoliK
              </span>
            </div>
            <p className="text-white/28 text-sm leading-[1.65] max-w-[200px]">
              AI Departments. On Demand.
              <br />
              Every business deserves a team.
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

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-7 gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-white/18 text-sm">© 2024 AzoliK, Inc. All rights reserved.</p>
          <p
            className="text-white/14 text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Built for the exhausted owner.
          <br />
          Powered by AI that doesn't know what burnout is.
          </p>
        </div>
      </div>
    </footer>
  )
}
