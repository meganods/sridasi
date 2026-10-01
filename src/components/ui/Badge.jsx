import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
  primary: 'bg-sridasi-primary-50 text-sridasi-forest border-sridasi-primary-200/80',
  green: 'bg-sridasi-leaf-50 text-sridasi-leaf-700 border-sridasi-leaf-200',
  water: 'bg-sridasi-aqua-50 text-sridasi-aqua-700 border-sridasi-aqua-200',
  gold: 'bg-sridasi-gold-50 text-sridasi-gold-800 border-sridasi-gold-200',
  outline: 'bg-transparent text-sridasi-forest border-sridasi-primary-300',
  glass: 'bg-white/60 backdrop-blur-md text-sridasi-forest border-white/80 shadow-soft-sm',
  dark: 'bg-sridasi-forest text-sridasi-primary-100 border-sridasi-primary-700',
};

const badgeSizes = {
  sm: 'px-2.5 py-0.5 text-xs font-semibold',
  md: 'px-3 py-1 text-xs font-semibold tracking-wide',
  lg: 'px-4 py-1.5 text-sm font-semibold',
};

export function Badge({
  className,
  variant = 'primary',
  size = 'md',
  dot = false,
  dotColor,
  icon,
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors select-none font-sans',
        badgeVariants[variant] || badgeVariants.primary,
        badgeSizes[size] || badgeSizes.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse',
            dotColor || 'bg-sridasi-green'
          )}
        />
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
