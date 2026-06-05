import * as React from 'react';
import { cn } from '../../lib/cn';

interface Props {
  before: string;
  after: string;
  alt?: string;
  plate?: string;
  className?: string;
  initial?: number;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  before,
  after,
  alt = '',
  plate,
  className,
  initial = 50,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: Props): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pct, setPct] = React.useState(initial);
  const draggingRef = React.useRef(false);

  const updateFromClient = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    setPct(p);
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') setPct((p) => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setPct((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={`Before and after — ${alt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      onKeyDown={onKey}
      className={cn(
        'relative aspect-[16/10] select-none overflow-hidden rounded-lg border border-gold/10',
        className,
      )}
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClient(e.clientX);
      }}
      onMouseMove={(e) => draggingRef.current && updateFromClient(e.clientX)}
      onMouseUp={() => (draggingRef.current = false)}
      onMouseLeave={() => (draggingRef.current = false)}
      onTouchStart={(e) => {
        draggingRef.current = true;
        updateFromClient(e.touches[0]!.clientX);
      }}
      onTouchMove={(e) =>
        draggingRef.current && updateFromClient(e.touches[0]!.clientX)
      }
      onTouchEnd={() => (draggingRef.current = false)}
    >
      <img
        src={after}
        alt={`${alt} — after`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt} — before`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div
        className="absolute inset-y-0 z-10 flex w-px -translate-x-1/2 cursor-ew-resize items-center justify-center bg-gold"
        style={{ left: `${pct}%` }}
      >
        <div className="grid h-10 w-10 place-items-center rounded-full border border-gold bg-bg-elev text-gold shadow-glow-sm">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M8 10l-4 2 4 2M16 10l4 2-4 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded bg-bg/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-fg-muted backdrop-blur">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded bg-bg/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur">
        {afterLabel}
      </div>
      {plate && (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded bg-bg/80 px-2 py-0.5 font-mono text-[11px] text-fg-muted backdrop-blur">
          {plate}
        </div>
      )}
    </div>
  );
}
