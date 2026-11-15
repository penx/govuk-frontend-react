import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export { FormGroup as Root, type FormGroupProps as RootProps } from '../../objects/form-group';
export { ErrorMessage, type ErrorMessageProps } from '../error-message';
export { Hint, type HintProps } from '../hint';
export { Label, type LabelProps } from '../label';

export type ControlProps = ComponentProps<'textarea'> & {
  error?: boolean;
};

export function Control({ className, error, rows, ...props }: ControlProps) {
  return (
    <textarea
      className={clsx('govuk-textarea', error && 'govuk-textarea--error', className)}
      rows={rows || 5}
      {...props}
    />
  );
}
