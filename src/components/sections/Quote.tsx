import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ScrollRevealText } from '../ScrollRevealText';
import { GradientText } from '../ui';

export function QuoteSection() {
  const ref = useScrollReveal<HTMLElement>();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    let ticking = false;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setTilt({ x: dy * -6, y: dx * 8 });
          ticking = false;
        });
      }
    };

    const onLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section ref={ref} id="quote" className="reveal relative z-10 py-40 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Glow behind text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            style={{
              width: '600px',
              height: '400px',
              background:
                'radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div
          ref={sceneRef}
          className="relative z-10"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <ScrollRevealText>
              <blockquote
                className="font-bold leading-[1.1] tracking-[-0.03em]"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(36px, 6vw, 84px)' }}
              >
                <span className="text-white/30">Most AIs work </span>
                <span
                  className="text-white"
                  style={{ transform: 'translateZ(30px)', display: 'inline-block' }}
                >
                  with you.
                </span>
                <br />
                <GradientText>AzoliK works </GradientText>
                <span
                  className="text-white"
                  style={{ transform: 'translateZ(50px)', display: 'inline-block' }}
                >
                  for you.
                </span>
              </blockquote>
            </ScrollRevealText>

            <ScrollRevealText>
              <p
                className="mt-10 text-white/30 text-sm tracking-[0.2em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace", transform: 'translateZ(10px)' }}
              >
                — The AzoliK principle
              </p>
            </ScrollRevealText>
          </div>

          {/* Floating accent dots that track mouse */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '20%',
              left: '15%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(167,139,250,0.3)',
              boxShadow: '0 0 20px rgba(167,139,250,0.2)',
              transform: `translate3d(${tilt.y * 3}px, ${tilt.x * -3}px, 20px)`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '25%',
              right: '12%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(79,209,197,0.3)',
              boxShadow: '0 0 16px rgba(79,209,197,0.2)',
              transform: `translate3d(${tilt.y * -4}px, ${tilt.x * 4}px, 15px)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: '60%',
              left: '8%',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'rgba(251,146,60,0.25)',
              boxShadow: '0 0 14px rgba(251,146,60,0.15)',
              transform: `translate3d(${tilt.y * 5}px, ${tilt.x * -2}px, 25px)`,
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
