import * as React from 'react';
import { cn } from '../../lib/cn';

interface Props {
  className?: string;
  children?: React.ReactNode;
  size?: number;
  color?: string;
}

export function Spotlight({
  className,
  children,
  size = 500,
  color = 'rgba(245,197,24,0.12)',
}: Props): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -9999, y: -9999, visible: false });

  const onMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const onLeave = React.useCallback(() => {
    setPos((p) => ({ ...p, visible: false }));
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.visible ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
