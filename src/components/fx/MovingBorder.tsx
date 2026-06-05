import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface Props {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
}

export function MovingBorder({
  children,
  duration = 4,
  className,
  containerClassName,
}: Props): React.ReactElement {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg p-[1px]',
        containerClassName,
      )}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, rgba(245,197,24,0) 0deg, rgba(245,197,24,1) 80deg, rgba(245,197,24,0) 160deg, rgba(245,197,24,0) 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className={cn(
          'relative rounded-[calc(var(--radius-lg)-1px)] bg-bg-elev',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
