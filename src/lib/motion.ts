import type { Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function stagger(delayChildren = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    show: { transition: { delayChildren, staggerChildren } },
  };
}

export const letterStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const letterChild: Variants = {
  hidden: { opacity: 0, y: '0.5em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const viewportOnce = { once: true, amount: 0.3 } as const;
