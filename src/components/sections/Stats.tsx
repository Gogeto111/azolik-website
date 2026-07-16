import { useEffect, useRef, useState } from 'react';
import { STATS } from '../../data';
import { useCountUp } from '../../hooks/useCountUp';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function StatItem({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(visible ? stat.value : 0, 1800 + index * 200);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative text-center p-8 rounded-2xl group holo-card card-glow entrance-scale-up"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.4s ease, background 0.4s ease',
        animationDelay: `${index * 100}ms`,
        ['--glow-color' as string]: `${stat.color}18`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${stat.color}33`;
        e.currentTarget.style.background = `${stat.color}08`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${stat.color}12 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10">
        <div
          className="font-bold text-white mb-2"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(40px, 5vw, 56px)',
            lineHeight: 1,
            background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count}
          {stat.suffix}
        </div>
        <p
          className="text-white/40 text-sm tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export function StatsSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="stats" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
