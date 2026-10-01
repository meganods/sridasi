import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-sridasi-forest text-white hover:bg-sridasi-dark shadow-soft hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-sridasi-forest border border-sridasi-forest/20',
  secondary: 'bg-sridasi-green text-white hover:bg-sridasi-leaf-600 shadow-soft hover:shadow-glow-green hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-sridasi-green',
  outline: 'bg-white/70 backdrop-blur-sm text-sridasi-forest border border-sridasi-forest/25 hover:bg-sridasi-primary-50 hover:border-sridasi-forest/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-sridasi-forest',
  water: 'bg-sridasi-water text-white hover:bg-sridasi-aqua-600 shadow-soft hover:shadow-glow-aqua hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-sridasi-water',
  gold: 'bg-sridasi-yellow text-sridasi-primary-950 hover:bg-sridasi-gold-400 font-semibold shadow-soft hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-sridasi-yellow',
  ghost: 'bg-transparent text-sridasi-forest hover:bg-sridasi-primary-50 active:bg-sridasi-primary-100 focus-visible:ring-sridasi-forest',
  glass: 'bg-white/40 hover:bg-white/70 text-sridasi-forest border border-white/60 backdrop-blur-md shadow-soft hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-sridasi-forest',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs font-medium rounded-full gap-1.5',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-full gap-2',
  lg: 'px-6 py-3.5 text-base font-semibold rounded-full gap-2.5',
  xl: 'px-8 py-4 text-lg font-bold rounded-full gap-3',
};

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 items-center transition-transform duration-200 group-hover:translate-x-0.5">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
