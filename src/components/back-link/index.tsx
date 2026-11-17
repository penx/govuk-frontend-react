import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { Slot } from '../../utils/slot';

export type BackLinkProps = ComponentProps<'a'> & {
  /** Use on dark backgrounds. */
  inverse?: boolean;
  /** Render the only child (such as a router's link) instead of an `a`, with the back link classes merged onto it. */
  asChild?: boolean;
};

/**
 * Use the back link component to help users go back to the previous page in a multi-page transaction.
 *
 * @see https://design-system.service.gov.uk/components/back-link/
 */
export function BackLink({ className, href, inverse, asChild, children, ...props }: BackLinkProps) {
  const backLinkClassName = clsx(
    'govuk-back-link',
    inverse && 'govuk-back-link--inverse',
    className,
  );
  if (asChild) {
    return (
      <Slot className={backLinkClassName} {...props}>
        {children}
      </Slot>
    );
  }
  return (
    <a href={href || '#'} className={backLinkClassName} {...props}>
      {hasContent(children) ? children : 'Back'}
    </a>
  );
}
