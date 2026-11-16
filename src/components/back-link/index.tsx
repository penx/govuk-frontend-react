import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { Slot } from '../../utils/slot';

export type BackLinkProps = ComponentProps<'a'> & {
  inverse?: boolean;
  /** Render the only child (such as a router's link) instead of an `a`, with the back link classes merged onto it. */
  asChild?: boolean;
};

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
