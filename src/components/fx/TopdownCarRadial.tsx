import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
  spin?: boolean;
  spinDuration?: number;
}

export function TopdownCarRadial({
  src,
  alt = '',
  className,
  spin = true,
  spinDuration = 80,
}: Props): React.ReactElement {
  return (
    <div
      className={cn(
        'relative grid aspect-square w-full place-items-center',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full blur-[2px]"
        style={{
          background:
            'radial-gradient(circle at center, rgb(var(--gold)) 0%, rgb(var(--gold-deep)) 55%, rgba(199,154,15,0) 72%)',
        }}
      />
      {src && (
        <motion.img
          src={src}
          alt={alt}
          className="relative z-10 h-[62%] w-[62%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)]"
          animate={spin ? { rotate: 360 } : undefined}
          transition={
            spin
              ? { duration: spinDuration, repeat: Infinity, ease: 'linear' }
              : undefined
          }
          draggable={false}
        />
      )}
    </div>
  );
}
