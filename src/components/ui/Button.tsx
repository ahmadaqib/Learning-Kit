import React from 'react';
import { markUserInteraction, playSound } from '@/engine/sound';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  soundEnabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  soundEnabled = false,
  className = '',
  children,
  onClick,
  disabled,
  type = 'button',
  ...rest
}) => {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'pw-btn-primary',
    secondary: 'pw-btn-secondary',
    ghost: 'pw-btn-ghost',
    danger:
      'pw-pressable min-block-size-[var(--touch-min)] min-inline-size-[var(--touch-min)] rounded-[var(--radius-md)] border-0 bg-[var(--err-500)] px-5 py-2.5 font-extrabold text-white shadow-[0_3px_0_var(--err-600)] cursor-pointer hover:brightness-105 disabled:opacity-50 disabled:shadow-none',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={(e) => {
        markUserInteraction();
        if (soundEnabled) playSound('tap', true);
        onClick?.(e);
      }}
      className={`inline-flex items-center justify-center gap-2 ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <span aria-hidden="true" className="inline-flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:100ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:200ms]" />
        </span>
      ) : (
        children
      )}
    </button>
  );
};
