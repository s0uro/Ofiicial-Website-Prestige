import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Initial delay before line 1 starts (seconds). */
  delay?: number;
  /** Gap between word reveals within the same line (seconds). */
  stagger?: number;
  /** Gap between successive lines (seconds). */
  lineStagger?: number;
  /** Each word's animation duration (seconds). */
  duration?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function TextReveal({
  text,
  className,
  as = 'h2',
  delay = 0,
  stagger = 0.05,
  lineStagger = 0.65,
  duration = 0.5,
}: Props): React.ReactElement {
  const lines = text.split('\n');
  const multiLine = lines.length > 1;
  const Tag = (as as 'h1' | 'h2' | 'h3' | 'p');

  return (
    <Tag className={cn(className)} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span
          key={li}
          className={cn('block', multiLine && 'whitespace-nowrap')}
        >
          {line.split(' ').map((word, wi) => (
            <motion.span
              key={`${li}-${wi}`}
              aria-hidden
              className="mr-[0.25em] inline-block whitespace-nowrap"
              initial={{ opacity: 0, y: '0.5em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: delay + li * lineStagger + wi * stagger,
                duration,
                ease,
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
