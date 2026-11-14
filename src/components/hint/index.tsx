import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type HintProps = ComponentProps<'div'>;

export function Hint({ className, ...props }: HintProps) {
  return <div className={clsx('govuk-hint', className)} {...props} />;
}
