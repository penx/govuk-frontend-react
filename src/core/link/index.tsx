import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type LinkProps = ComponentProps<'a'> & {
  variant?: 'inverse' | 'muted' | 'text-colour';
  noUnderline?: boolean;
  noVisitedState?: boolean;
};

export function Link({
  variant,
  noUnderline,
  noVisitedState,
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <a
      className={clsx(
        'govuk-link',
        variant && `govuk-link--${variant}`,
        noUnderline && 'govuk-link--no-underline',
        noVisitedState && 'govuk-link--no-visited-state',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
