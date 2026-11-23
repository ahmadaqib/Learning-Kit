import React from 'react';
import { useCountUp } from '@/motion/useCountUp';

export interface CountUpProps {
  value: number;
  /** Junior ms. 300 for the session chip, 600 for result lines (default). */
  duration?: number;
  /** Start time inside a sequence, Junior ms. */
  delay?: number;
  /** The number shown first. Defaults to 0. */
  from?: number;
  /** A skipped sequence: show the final number at once. */
  skip?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * A number that counts up (M23). The animated digits are aria-hidden and a visually hidden element carries the
 * final value, so a screen reader never hears the intermediate numbers.
 */
export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 600,
  delay = 0,
  from = 0,
  skip = false,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const shown = useCountUp(value, { duration, delay, from, skip });
  return (
    <span className={className || undefined}>
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
      <span className="visually-hidden">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
};
