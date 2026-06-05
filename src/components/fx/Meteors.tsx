import * as React from 'react';
import { cn } from '../../lib/cn';

interface Props {
  number?: number;
  className?: string;
}

export function Meteors({
  number = 18,
  className,
}: Props): React.ReactElement {
  const meteors = React.useMemo(
    () =>
      Array.from({ length: number }).map((_, i) => ({
        id: i,
        top: Math.random() * 60,
        left: Math.random() * 100,
        delay: `${Math.random() * 1.2}s`,
        duration: `${Math.random() * 6 + 4}s`,
      })),
    [number],
  );

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-gold"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animation: `meteor-fall ${m.duration} linear ${m.delay} infinite`,
          }}
        >
          <span className="pointer-events-none absolute left-0 top-1/2 h-px w-[100px] -translate-y-1/2 bg-gradient-to-r from-gold to-transparent" />
        </span>
      ))}
      <style>{`
        @keyframes meteor-fall {
          0% { transform: translate(0, 0) rotate(215deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(-600px, 600px) rotate(215deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
