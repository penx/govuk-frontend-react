import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type ButtonGroupProps = ComponentProps<'div'>;

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return <div className={clsx('govuk-button-group', className)} {...props} />;
}
