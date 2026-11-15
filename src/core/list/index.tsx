import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type ListProps = ComponentProps<'ol'> & { variant?: 'bullet' | 'number'; spaced?: boolean };

export function List({ variant, spaced, className, ...props }: ListProps) {
  const Element = variant === 'number' ? 'ol' : 'ul';
  return (
    <Element
      className={clsx(
        'govuk-list',
        variant && `govuk-list--${variant}`,
        spaced && 'govuk-list--spaced',
        className,
      )}
      {...props}
    />
  );
}
