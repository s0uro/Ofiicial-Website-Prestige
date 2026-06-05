import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface Props {
  className?: string;
  duration?: number;
}

export function BorderBeam({
  className,
  duration = 10,
}: Props): React.ReactElement {
  return (
    <motion.div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [padding:1px]',
        className,
      )}
      style={{
        background:
          'conic-gradient(from 0deg at 50% 50%, rgba(245,197,24,0) 0deg, rgba(245,197,24,0) 340deg, rgba(245,197,24,1) 355deg, rgba(245,197,24,0) 360deg)',
        WebkitMask:
          'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    />
  );
}
