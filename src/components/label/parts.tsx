import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'label'> & {
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Root({ className, size, children, ...props }: RootProps) {
  return (
    <label className={clsx('govuk-label', size && `govuk-label--${size}`, className)} {...props}>
      {children}
    </label>
  );
}

export type WrapperProps = ComponentProps<'h1'>;

export function Wrapper({ className, children, ...props }: WrapperProps) {
  return (
    <h1 className={clsx('govuk-label-wrapper', className)} {...props}>
      {children}
    </h1>
  );
}
