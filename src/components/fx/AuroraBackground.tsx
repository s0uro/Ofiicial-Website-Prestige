import * as React from 'react';
import { cn } from '../../lib/cn';

interface Props {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'soft' | 'default' | 'strong';
}

const intensities = {
  soft: 0.25,
  default: 0.4,
  strong: 0.6,
} as const;

export function AuroraBackground({
  className,
  children,
  intensity = 'default',
}: Props): React.ReactElement {
  const opacity = intensities[intensity];
  return (
    <div className={cn('relative isolate overflow-hidden bg-bg', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ opacity }}
      >
        <div
          className="absolute left-1/2 top-[-10%] h-[60vh] w-[140vw] -translate-x-1/2 animate-aurora"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(245,197,24,0.6), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(255,229,138,0.45), transparent 55%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute left-1/2 top-[20%] h-[50vh] w-[120vw] -translate-x-1/2 animate-aurora"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(199,154,15,0.7), transparent 60%)',
            filter: 'blur(90px)',
            animationDirection: 'reverse',
            animationDuration: '28s',
          }}
        />
      </div>
      {children}
    </div>
  );
}
