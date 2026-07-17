import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  style?: CSSProperties;
};

export function GlassCard({ children, className = '', style = {}, ...rest }: Props) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${className}`}
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function GradientText({
  children,
  className = '',
  animated = false,
}: {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}) {
  return (
    <span
      className={`${animated ? 'gradient-flow-text' : ''} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #4fd1c5 0%, #a78bfa 45%, #fb923c 100%)',
        backgroundSize: animated ? '200% auto' : 'auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({
  children,
  color = 'rgba(167,139,250,0.9)',
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <span
        className="w-8 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color})` }}
      />
      <p
        className="text-center text-[11px] tracking-[0.22em] uppercase font-medium"
        style={{ fontFamily: "'JetBrains Mono', monospace", color }}
      >
        {children}
      </p>
      <span
        className="w-8 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${color})` }}
      />
    </div>
  );
}

export function AzolicLogo({
  size = 28,
  className = '',
  ...rest
}: { size?: number; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{
        width: size,
        height: size,
        ...rest.style,
      }}
      {...rest}
    >
      <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
        <defs>
          <linearGradient
            id="logoGradient"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stop-color="#22D3EE" stop-opacity="1" />
            <stop offset="33%" stop-color="#0EA5E9" stop-opacity="1" />
            <stop offset="66%" stop-color="#3B82F6" stop-opacity="1" />
            <stop offset="100%" stop-color="#6366F1" stop-opacity="1" />
          </linearGradient>
        </defs>

        <g>
          <path
            d="M64 8 C33.1 8 8 33.1 8 64 C8 70.6 11.4 77 16.8 82.3 L21.5 87 C24.5 80.8 32 74.5 41.2 71.8 C48.7 69.6 56.5 69 64 69 C71.5 69 79.3 69.6 86.8 71.8 C96 74.5 103.5 80.8 106.5 87 L111.2 82.3 C116.6 77 120 70.6 120 64 C120 33.1 94.9 8 64 8 Z"
            fill="url(#logoGradient)"
            fill-opacity="1"
          />

          <path
            d="M64 8 C94.9 8 120 33.1 120 64 C113.4 64 107 67.4 101.7 72.1 L106.5 76.8 C110.2 71.5 115.5 68 120 64 C120 94.9 94.9 120 64 120 C57.5 120 51.1 116.5 46.4 111.2 L41.7 106.5 C37 110.2 33.5 115.5 32 120 C32 94.9 57.1 69.8 64 64 Z"
            fill="url(#logoGradient)"
            fill-opacity="0.85"
          />

          <path
            d="M64 120 C94.9 120 120 94.9 120 64 C113.4 57.4 107 53.9 101.7 49.2 L106.5 44.5 C110.2 49.8 115.5 53.3 120 57.1 C120 94.9 94.9 120 64 120 C70.5 120 76.9 116.5 81.6 111.2 L86.3 106.5 C91 110.2 94.5 115.5 96 120 C96 94.9 69.9 69.8 64 64 Z"
            fill="url(#logoGradient)"
            fill-opacity="0.7"
          />

          <path
            d="M64 120 C33.1 120 8 94.9 8 64 C14.6 64 21 60.6 26.3 55.9 L21.5 51.2 C17.8 56.5 12.5 60 8 64 C8 33.1 33.1 8 64 8 C70.5 8 76.9 11.5 81.6 16.8 L76.9 21.5 C72.2 17.8 68.7 12.5 64 8 Z"
            fill="url(#logoGradient)"
            fill-opacity="0.55"
          />
        </g>

        <g stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round">
          <line x1="64" y1="8" x2="64" y2="64" />
          <line x1="64" y1="64" x2="120" y2="64" />
          <line x1="64" y1="64" x2="64" y2="120" />
          <line x1="8" y1="64" x2="64" y2="64" />
        </g>

        <g transform="translate(64, 64)">
          <polygon
            points="0,-20 17.3,10 -17.3,10"
            fill="none"
            stroke="white"
            stroke-width="2.5"
            stroke-linejoin="round"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
}

export function CheckMark({ color }: { color: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
      <path
        d="M1.5 4.5L3.8 7L7.5 2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
