import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export { FormGroup as Root, type FormGroupProps as RootProps } from '../../objects/form-group';
export { ErrorMessage, type ErrorMessageProps } from '../error-message';
export { Hint, type HintProps } from '../hint';
export { Label, type LabelProps } from '../label';

export type ControlProps = ComponentProps<'select'> & {
  error?: boolean;
};

export function Control({ className, error, ...props }: ControlProps) {
  return (
    <select
      className={clsx('govuk-select', error && 'govuk-select--error', className)}
      {...props}
    />
  );
}
