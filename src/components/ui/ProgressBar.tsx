import React from 'react';

interface ProgressBarProps {
  value: number; // 0..100
  variant?: 'lesson' | 'xp' | 'world';
  label: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'lesson',
  label,
  color,
}) => {
  const clamped = Math.max(0, Math.min(100, value));
  const heightClass = variant === 'xp' ? 'h-2' : 'h-2.5';
  const fillColor = color ?? (variant === 'xp' ? 'var(--star)' : 'var(--world-600)');

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={`w-full overflow-hidden rounded-full bg-[var(--line)] ${heightClass}`}
    >
      <div
        className="h-full rounded-full transition-[width] duration-300 ease-out"
        style={{
          width: `${clamped}%`,
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
};
