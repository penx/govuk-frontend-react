import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type Spacing } from '../../overrides';

export type ListProps = ComponentProps<'ol'> & {
  variant?: 'bullet' | 'number';
  spaced?: boolean;
  marginBottom?: Spacing;
};

export function List({ variant, spaced, marginBottom, className, ...props }: ListProps) {
  const Element = variant === 'number' ? 'ol' : 'ul';
  return (
    <Element
      className={clsx(
        'govuk-list',
        variant && `govuk-list--${variant}`,
        spaced && 'govuk-list--spaced',
        overrideClasses({ marginBottom }),
        className,
      )}
      {...props}
    />
  );
}
