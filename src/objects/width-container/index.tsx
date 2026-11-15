import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type WidthContainerProps = ComponentProps<'div'>;

export function WidthContainer({ className, ...props }: WidthContainerProps) {
  return <div className={clsx('govuk-width-container', className)} {...props} />;
}
