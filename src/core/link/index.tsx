import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { Slot } from '../../utils/slot';

export type LinkProps = ComponentProps<'a'> & {
  variant?: 'inverse' | 'muted' | 'text-colour';
  noUnderline?: boolean;
  noVisitedState?: boolean;
  /** Render the only child (such as a router's link) instead of an `a`, with the link classes merged onto it. */
  asChild?: boolean;
};

/**
 * Use links to navigate between pages.
 *
 * @see https://design-system.service.gov.uk/styles/links/
 */
export function Link({
  variant,
  noUnderline,
  noVisitedState,
  asChild,
  className,
  children,
  ...props
}: LinkProps) {
  const Element = asChild ? Slot : 'a';
  return (
    <Element
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
    </Element>
  );
}
