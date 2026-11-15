import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessage } from '../error-message';
import { Hint } from '../hint';
import { Label } from '../label';

export type ControlProps = ComponentProps<'textarea'> & {
  error?: boolean;
};

export type FieldProps = Omit<ControlProps, 'error'> & {
  label?: ReactNode;
  hint?: ReactNode;
  errorMessage?: ReactNode;
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

export function Field({
  id: idProp,
  name,
  label,
  hint,
  errorMessage,
  'aria-describedby': describedBy,
  ...props
}: FieldProps) {
  const id = idProp || name;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;

  return (
    <FormGroup error={Boolean(errorId)}>
      <Label htmlFor={id}>{label}</Label>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
      <Control
        id={id}
        name={name}
        error={Boolean(errorId)}
        aria-describedby={joinIds(describedBy, hintId, errorId)}
        {...props}
      />
    </FormGroup>
  );
}
