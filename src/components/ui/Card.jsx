import React from 'react';
import { cn } from '../../utils/cn';

const cardVariants = {
  default: 'bg-white border border-sridasi-neutral-200 shadow-soft-sm',
  elevated: 'bg-white border border-sridasi-neutral-200/80 shadow-soft hover:shadow-soft-md transition-shadow duration-300',
  glass: 'sridasi-glass shadow-soft',
  glassDark: 'sridasi-glass-dark text-white shadow-soft-md',
  cream: 'bg-sridasi-cream border border-sridasi-gold-200/60 shadow-soft-sm',
  forest: 'bg-sridasi-forest text-white border border-sridasi-primary-400/20 shadow-soft-md',
  interactive: 'bg-white border border-sridasi-neutral-200 shadow-soft hover:border-sridasi-primary-300 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
};

export function Card({
  className,
  variant = 'default',
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 relative overflow-hidden transition-all duration-200',
        cardVariants[variant] || cardVariants.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, as: Component = 'h3', ...props }) {
  return (
    <Component
      className={cn('text-xl font-bold font-heading text-sridasi-forest leading-tight', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-sridasi-neutral-600 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('pt-2 text-sridasi-neutral-700', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('flex items-center pt-4 border-t border-sridasi-neutral-100 mt-4', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
