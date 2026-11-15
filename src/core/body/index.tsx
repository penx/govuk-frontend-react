import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type BodyProps = ComponentProps<'p'> & { size?: 'l' | 'm' | 's' };

export function Body({ size, className, ...props }: BodyProps) {
  return <p className={clsx(size ? `govuk-body-${size}` : 'govuk-body', className)} {...props} />;
}
