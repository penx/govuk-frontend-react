import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type BackLinkProps = ComponentProps<'a'> & {
  inverse?: boolean;
};

export function BackLink({ className, href, inverse, children, ...props }: BackLinkProps) {
  return (
    <a
      href={href || '#'}
      className={clsx('govuk-back-link', inverse && 'govuk-back-link--inverse', className)}
      {...props}
    >
      {hasContent(children) ? children : 'Back'}
    </a>
  );
}
