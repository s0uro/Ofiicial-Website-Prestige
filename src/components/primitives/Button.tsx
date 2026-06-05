import * as React from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'whatsapp'
  | 'call';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-bg hover:bg-gold-soft active:bg-gold-deep',
  secondary:
    'border border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:border-gold/60',
  ghost: 'text-fg hover:bg-fg/5',
  whatsapp: 'bg-[#25D366] text-black hover:bg-[#1fb657]',
  call:
    'border border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:border-gold/60',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const classes = cn(base, sizes[size], variants[variant], className);
  if ('href' in props && props.href) {
    return (
      <a className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
