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
        'grid auto-rows-[17rem] grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-3',
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
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-elev via-bg-elev/70 to-transparent"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 pt-3">
        {eyebrow && (
          <div className="text-[10px] uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </div>
        )}
        {icon && <div className="text-gold">{icon}</div>}
        {title && (
          <div className="font-display text-2xl leading-tight text-fg md:text-3xl">
            {title}
          </div>
        )}
        {description && (
          <p className="text-sm leading-relaxed text-fg-muted md:text-base">{description}</p>
        )}
        {children}
      </div>
    </>
  );

  const classes = cn(
    'group relative flex flex-col overflow-hidden rounded-lg border border-gold/10 bg-bg-elev p-5 md:p-6 transition-[border-color,box-shadow] duration-300 ease-out-expo hover:border-gold/30 hover:shadow-glow-sm',
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
