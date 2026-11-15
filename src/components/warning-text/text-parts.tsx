import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import {
  VisuallyHidden as BaseVisuallyHidden,
  type VisuallyHiddenProps,
} from '../../utilities/visually-hidden';

export type { VisuallyHiddenProps };

export type RootProps = ComponentProps<'strong'>;

export function Root({ className, ...props }: RootProps) {
  return <strong className={clsx('govuk-warning-text__text', className)} {...props} />;
}

export function VisuallyHidden({ children = 'Warning', ...props }: VisuallyHiddenProps) {
  return <BaseVisuallyHidden {...props}>{children}</BaseVisuallyHidden>;
}
