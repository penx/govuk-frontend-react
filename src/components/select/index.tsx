import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type FluidWidth } from '../../overrides';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type ControlProps = ComponentProps<'select'> & {
  error?: boolean;
  width?: FluidWidth;
};

export type FieldProps = LabelFieldProps &
  Omit<ControlProps, 'error'> & {
    /** The label used by the select component. */
    label?: ReactNode;
    /** Can be used to add a hint to the select component. */
    hint?: ReactNode;
    /** Can be used to add an error message to the select component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. */
    errorMessage?: ReactNode;
  };

/**
 * Help users select an item from a list.
 *
 * @see https://design-system.service.gov.uk/components/select/
 */
export function Control({ className, error, width, ...props }: ControlProps) {
  return (
    <select
      className={clsx(
        'govuk-select',
        error && 'govuk-select--error',
        overrideClasses({ width }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * Help users select an item from a list.
 *
 * @see https://design-system.service.gov.uk/components/select/
 */
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
