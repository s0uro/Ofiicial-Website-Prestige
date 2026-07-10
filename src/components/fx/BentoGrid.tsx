import * as React from 'react';
import { cn } from '../../lib/cn';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: GridProps): React.ReactElement {
  return (
    <div
      className={cn(
        'grid auto-rows-[18rem] grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ItemProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  header?: React.ReactNode;
  href?: string;
  eyebrow?: React.ReactNode;
  children?: React.ReactNode;
}

export function BentoItem({
  className,
  title,
  description,
  icon,
  imageUrl,
  imageAlt = '',
  header,
  href,
  eyebrow,
  children,
}: ItemProps): React.ReactElement {
  const headerContent = imageUrl ? (
    <img
      src={imageUrl}
      alt={imageAlt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-500 ease-out-expo transform-gpu will-change-transform group-hover:scale-105"
    />
  ) : (
    header
  );

  const inner = (
    <>
      {headerContent && (
        <div className="relative -mx-5 -mt-5 flex flex-1 overflow-hidden md:-mx-6 md:-mt-6">
          {headerContent}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg-elev via-bg-elev/80 to-transparent"
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5 pt-3">
        {eyebrow && (
          <div className="text-[10px] uppercase tracking-[0.2em] text-gold/70 transition-colors duration-200 group-hover:text-gold">
            {eyebrow}
          </div>
        )}
        {icon && <div className="text-gold">{icon}</div>}
        {title && (
          <div className="flex items-center justify-between gap-2">
            <div className="font-display text-xl leading-tight text-fg transition-colors duration-200 group-hover:text-fg md:text-2xl">
              {title}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 translate-x-1 text-gold/0 opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:text-gold/70 group-hover:opacity-100"
              aria-hidden
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        )}
        {description && (
          <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
        )}
        {children}
      </div>
    </>
  );

  const classes = cn(
    'group relative flex flex-col overflow-hidden rounded-xl border border-gold/10 bg-bg-elev p-5 shadow-card md:p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out-expo hover:border-gold/30 hover:shadow-card-hover hover:-translate-y-0.5',
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return <div className={classes}>{inner}</div>;
}
