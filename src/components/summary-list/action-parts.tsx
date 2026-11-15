import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export { VisuallyHidden, type VisuallyHiddenProps } from '../../utilities/visually-hidden';

export type RootProps = ComponentProps<'a'>;

export function Root({ className, children, ...props }: RootProps) {
  return (
    <a className={clsx('govuk-link', className)} {...props}>
      {children}
    </a>
  );
}
