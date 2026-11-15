import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type FluidWidth } from '../../overrides';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type ControlProps = ComponentProps<'textarea'> & {
  error?: boolean;
  width?: FluidWidth;
};

export type FieldProps = LabelFieldProps &
  Omit<ControlProps, 'error'> & {
    label?: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
  };

export function Control({ className, error, width, rows, ...props }: ControlProps) {
  return (
    <textarea
      className={clsx(
        'govuk-textarea',
        error && 'govuk-textarea--error',
        overrideClasses({ width }),
        className,
      )}
      rows={rows || 5}
      {...props}
    />
  );
}

export function Field({
  id: idProp,
  name,
  label,
  labelSize,
  labelIsPageHeading,
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
      <LabelComposite htmlFor={id} size={labelSize} isPageHeading={labelIsPageHeading}>
        {label}
      </LabelComposite>
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
