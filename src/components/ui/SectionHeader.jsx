import React from 'react';
import { cn } from '../../utils/cn';
import Badge from './Badge';

export function SectionHeader({
  badge,
  badgeVariant = 'primary',
  title,
  highlightText,
  description,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
}) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 lg:mb-16', alignmentClasses[align], className)}>
      {badge && (
        <div className="mb-4">
          <Badge variant={badgeVariant} dot>
            {badge}
          </Badge>
        </div>
      )}

      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-sridasi-forest tracking-tight leading-tight',
          titleClassName
        )}
      >
        {title}
        {highlightText && (
          <span className="sridasi-gradient-text-forest block sm:inline sm:ml-2">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg text-sridasi-neutral-600 font-normal leading-relaxed',
            subtitleClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
