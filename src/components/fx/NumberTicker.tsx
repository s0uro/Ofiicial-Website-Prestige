import * as React from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  decimals?: number;
  locale?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function NumberTicker({
  value,
  duration = 1.8,
  decimals,
  locale = 'en-IE',
  className,
  prefix = '',
  suffix = '',
}: Props): React.ReactElement {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    const d = decimals ?? 0;
    const formatted = v.toLocaleString(locale, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    });
    return `${prefix}${formatted}${suffix}`;
  });

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, value, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
