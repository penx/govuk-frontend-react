import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';

export type FormGroupProps = ComponentProps<'div'> & {
  error?: boolean;
};

export type FieldFormGroupProps = Omit<FormGroupProps, 'children' | 'error'> & {
  beforeInput?: ReactNode;
  afterInput?: ReactNode;
};

export function FormGroup({ className, error, ...props }: FormGroupProps) {
  return (
    <div
      className={clsx('govuk-form-group', error && 'govuk-form-group--error', className)}
      {...props}
    />
  );
}
