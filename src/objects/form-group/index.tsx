import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type FormGroupProps = ComponentProps<'div'> & {
  error?: boolean;
};

export function FormGroup({ className, error, ...props }: FormGroupProps) {
  return (
    <div
      className={clsx('govuk-form-group', error && 'govuk-form-group--error', className)}
      {...props}
    />
  );
}
