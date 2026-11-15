import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import {
  VisuallyHidden as BaseVisuallyHidden,
  type VisuallyHiddenProps,
} from '../../utilities/visually-hidden';

export type { VisuallyHiddenProps };

export type RootProps = ComponentProps<'p'>;

export function Root({ className, ...props }: RootProps) {
  return <p className={clsx('govuk-error-message', className)} {...props} />;
}

export function VisuallyHidden({ children = 'Error:', ...props }: VisuallyHiddenProps) {
  return <BaseVisuallyHidden {...props}>{children}</BaseVisuallyHidden>;
}
