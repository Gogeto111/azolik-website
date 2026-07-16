import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function ScrollRevealText({ children, className = '', style = {} }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      return;
    }

    let ticking = false;
    let currentOpacity = 0.2;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - vh / 2);
      const maxDist = vh * 0.6;
      const progress = Math.max(0, 1 - distance / maxDist);
      const targetOpacity = 0.2 + progress * 0.8;

      if (Math.abs(targetOpacity - currentOpacity) > 0.01) {
        currentOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.1;
        el.style.opacity = String(currentOpacity);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <span ref={ref} className={className} style={{ opacity: 0.2, ...style }}>
      {children}
    </span>
  );
}

export function ScrollHeadline({
  line1,
  line2,
  style = {},
}: {
  line1: string;
  line2: string;
  style?: CSSProperties;
}) {
  return (
    <h2 style={{ fontFamily: "'Outfit', sans-serif", ...style }}>
      <span className="text-white">{line1}</span>
      <br />
      <ScrollRevealText>{line2}</ScrollRevealText>
    </h2>
  );
}
