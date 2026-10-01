import React from 'react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
};

export function Container({
  className,
  size = 'lg',
  children,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizes[size] || sizes.lg,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Grid({
  className,
  cols = 3,
  children,
  ...props
}) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid gap-6 lg:gap-8',
        colClasses[cols] || colClasses[3],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
