import { useCallback, useEffect, useState } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function EasterEgg() {
  const [unlocked, setUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.code;
      const expected = KONAMI[progress];
      if (key === expected) {
        const next = progress + 1;
        setProgress(next);
        if (next >= KONAMI.length) {
          setUnlocked(true);
          setProgress(0);
          setTimeout(() => setUnlocked(false), 4000);
        }
      } else {
        setProgress(0);
      }
    },
    [progress]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);

  if (!unlocked) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{ animation: 'fadeIn 0.3s ease' }}
    >
      <div
        className="text-center px-8 py-12 rounded-3xl"
        style={{
          background: 'rgba(12,14,19,0.95)',
          border: '1px solid rgba(167,139,250,0.3)',
          boxShadow: '0 0 120px rgba(167,139,250,0.2)',
          animation: 'panel-up 0.5s var(--ease) both',
        }}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Easter Egg Found!
        </h3>
        <p className="text-white/40 text-sm mb-4">
          You found the Konami code. You clearly have excellent taste.
        </p>
        <p className="text-white/20 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          ↑ ↑ ↓ ↓ ← → ← → B A
        </p>
      </div>
    </div>
  );
}
