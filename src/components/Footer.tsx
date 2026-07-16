import { Github, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { CONTACT_INFO, FOOTER_LINKS, FOOTER_LINK_MAP, SOCIAL_LINKS } from '../data';
import { AzoliKLogo } from './ui';

function SocialIcon({ name, href }: { name: string; href: string }) {
  const icons: Record<string, React.ReactNode> = {
    Twitter: <Twitter size={18} />,
    LinkedIn: <Linkedin size={18} />,
    GitHub: <Github size={18} />,
    Email: <Mail size={18} />,
  };

  return (
    <a
      href={href}
      className="p-2 text-white/40 hover:text-white/80 transition-colors rounded-lg hover:bg-white/5"
      aria-label={name}
      target={name !== 'Email' ? '_blank' : undefined}
      rel={name !== 'Email' ? 'noopener noreferrer' : undefined}
    >
      {icons[name]}
    </a>
  );
}

function ContactLink({
  icon: Icon,
  href,
  children,
}: { icon: React.ElementType; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      aria-label={String(children)}
    >
      <Icon size={16} />
      <span>{children}</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/[0.05] pt-16 pb-10 px-6"
      style={{ background: '#08090c' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <AzoliKLogo size={32} />
              <span
                className="font-semibold text-white"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px' }}
              >
                AzoliK
              </span>
            </div>
            <p className="text-white/28 text-sm leading-[1.65] max-w-[240px] mb-6">
              A full AI workforce — deployed in 48 hours, running 24/7.
            </p>
            <div className="flex flex-col gap-2">
              <ContactLink icon={Phone} href={CONTACT_INFO.phoneHref}>
                {CONTACT_INFO.phone}
              </ContactLink>
              <ContactLink icon={Mail} href={CONTACT_INFO.emailHref}>
                {CONTACT_INFO.email}
              </ContactLink>
            </div>
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
                {items.map(item => (
                  <li key={item}>
                    <a
                      href={FOOTER_LINK_MAP[item] || '#'}
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
          <p className="text-white/18 text-sm">© 2025 AzoliK™. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(social => (
                <SocialIcon key={social.name} name={social.icon} href={social.href} />
              ))}
            </div>
            <p
              className="text-white/14 text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <a href="/terms" className="hover:text-white/40 transition-colors">
                Terms & Conditions
              </a>
              <span className="mx-2">·</span>
              <a href="/privacy" className="hover:text-white/40 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
