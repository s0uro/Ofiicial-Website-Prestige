import * as React from 'react';
import { cn } from '../../lib/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: number;
  fade?: boolean;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 40,
  fade = true,
}: Props): React.ReactElement {
  return (
    <div
      className={cn('group relative flex overflow-hidden', className)}
      style={
        fade
          ? {
              WebkitMaskImage:
                'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
              maskImage:
                'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            }
          : undefined
      }
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-6 pr-6',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          'flex shrink-0 items-center gap-6 pr-6',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
