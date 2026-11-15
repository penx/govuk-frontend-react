import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type InsetTextProps = ComponentProps<'div'>;

export function InsetText({ className, ...props }: InsetTextProps) {
  return <div className={clsx('govuk-inset-text', className)} {...props} />;
}
