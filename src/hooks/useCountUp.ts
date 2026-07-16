import { useEffect, useState } from 'react';

export function useCountUp(target: number, duration = 1800): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration]);

  return current;
}
