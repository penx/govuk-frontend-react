import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type SkipLinkProps = ComponentProps<'a'>;

/**
 * Use the skip link component to help keyboard-only users skip to the main content on a page.
 *
 * @see https://design-system.service.gov.uk/components/skip-link/
 */
export function SkipLink({ href, className, children, ...props }: SkipLinkProps) {
  return (
    <a
      href={href || '#content'}
      className={clsx('govuk-skip-link', className)}
      data-module="govuk-skip-link"
      {...props}
    >
      {children}
    </a>
  );
}
