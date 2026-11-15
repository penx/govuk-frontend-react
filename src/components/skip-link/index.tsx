import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type SkipLinkProps = ComponentProps<'a'>;

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
