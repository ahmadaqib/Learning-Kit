import React from 'react';
import { markUserInteraction, playSound } from '@/engine/sound';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  soundEnabled?: boolean;
}

/**
 * Variants map to the `.pw-btn-*` classes in global.css. Press (M01) is a same-frame swap of face and edge,
 * with no transition on transform or box-shadow, so nothing here animates on tap. `inverse` is for posters.
 */
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'pw-btn-primary',
  secondary: 'pw-btn-secondary',
  ghost: 'pw-btn-ghost',
  danger: 'pw-btn-danger',
  inverse: 'pw-btn-inverse',
};

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
      className={`relative inline-flex items-center justify-center gap-2 ${VARIANT_CLASS[variant]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()}
      {...rest}
    >
      {loading ? (
        <>
          {/* The label keeps its width while loading, so the button does not jump. Screen readers still read it. */}
          <span className="inline-flex items-center justify-center gap-2 opacity-0">{children}</span>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 40 8"
            fill="none"
            className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-10 -translate-x-1/2 -translate-y-1/2"
          >
            <path className="pw-loader-dash" d="M3 4 H37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </>
      ) : (
        children
      )}
    </button>
  );
};
