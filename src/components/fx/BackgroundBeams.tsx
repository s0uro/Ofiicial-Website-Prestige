import * as React from 'react';
import { cn } from '../../lib/cn';

interface Props {
  className?: string;
  lines?: number;
}

export function BackgroundBeams({
  className,
  lines = 12,
}: Props): React.ReactElement {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 800 600"
        fill="none"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(245,197,24,0)" />
            <stop offset="50%" stopColor="rgba(245,197,24,0.35)" />
            <stop offset="100%" stopColor="rgba(245,197,24,0)" />
          </linearGradient>
        </defs>
        {Array.from({ length: lines }).map((_, i) => {
          const x = (i / (lines - 1)) * 800;
          return (
            <line
              key={i}
              x1={x}
              y1={0}
              x2={x + 220}
              y2={600}
              stroke="url(#beam-grad)"
              strokeWidth={1}
              opacity={0.35 + ((i % 3) * 0.2)}
            />
          );
        })}
      </svg>
    </div>
  );
}
