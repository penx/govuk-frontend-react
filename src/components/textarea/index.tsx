import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type FluidWidth } from '../../overrides';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type TextareaProps = ComponentProps<'textarea'> & {
  error?: boolean;
  width?: FluidWidth;
};

export type TextareaFieldProps = LabelFieldProps &
  Omit<TextareaProps, 'error'> & {
    /** The label used by the textarea component. */
    label?: ReactNode;
    /** Can be used to add a hint to the textarea component. */
    hint?: ReactNode;
    /** Can be used to add an error message to the textarea component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. */
    errorMessage?: ReactNode;
  };

/**
 * Help users provide detailed information using the textarea component.
 *
 * @see https://design-system.service.gov.uk/components/textarea/
 */
export function Textarea({ className, error, width, rows, ...props }: TextareaProps) {
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

/**
 * Help users provide detailed information using the textarea component.
 *
 * @see https://design-system.service.gov.uk/components/textarea/
 */
export function TextareaField({
  id: idProp,
  name,
  label,
  labelSize,
  labelIsPageHeading,
  hint,
  errorMessage,
  'aria-describedby': describedBy,
  ...props
}: TextareaFieldProps) {
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
      <Textarea
        id={id}
        name={name}
        error={Boolean(errorId)}
        aria-describedby={joinIds(describedBy, hintId, errorId)}
        {...props}
      />
    </FormGroup>
  );
}
