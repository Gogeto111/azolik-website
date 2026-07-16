import type { RefObject } from 'react';
import { useRef } from 'react';

export function useTilt<T extends HTMLElement>(): {
  ref: RefObject<T>;
  onMouseMove: (e: React.MouseEvent<T>) => void;
  onMouseLeave: (e: React.MouseEvent<T>) => void;
} {
  const ref = useRef<T>(null);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = 'transform 0.08s ease';
  };

  const onMouseLeave = (e: React.MouseEvent<T>) => {
    const el = ref.current || (e.currentTarget as T);
    el.style.transform = '';
    el.style.transition = 'transform 0.6s var(--ease)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
