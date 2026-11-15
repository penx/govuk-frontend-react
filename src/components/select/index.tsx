import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type ControlProps = ComponentProps<'select'> & {
  error?: boolean;
};

export type FieldProps = Omit<ControlProps, 'error'> & {
  label?: ReactNode;
  hint?: ReactNode;
  errorMessage?: ReactNode;
};

export function Control({ className, error, ...props }: ControlProps) {
  return (
    <select
      className={clsx('govuk-select', error && 'govuk-select--error', className)}
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
      <LabelComposite htmlFor={id}>{label}</LabelComposite>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
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
