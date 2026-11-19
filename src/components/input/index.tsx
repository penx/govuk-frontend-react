import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type FluidWidth } from '../../overrides';
import { hasContent } from '../../utils/has-content';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type InputProps = Omit<ComponentProps<'input'>, 'width'> & {
  error?: boolean;
  /** A number of characters, or a fraction of the container. */
  width?: 2 | 3 | 4 | 5 | 10 | 20 | 30 | FluidWidth;
  extraLetterSpacing?: boolean;
};

export type InputAffixProps = ComponentProps<'div'>;

export type InputFieldProps = LabelFieldProps &
  Omit<InputProps, 'error' | 'prefix'> & {
    /** The label used by the text input component. */
    label?: ReactNode;
    /** Can be used to add a hint to a text input component. */
    hint?: ReactNode;
    /** Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. */
    errorMessage?: ReactNode;
    /** Can be used to add a prefix to the text input component. */
    prefix?: ReactNode;
    /** Can be used to add a suffix to the text input component. */
    suffix?: ReactNode;
  };

/**
 * Help users enter information with the text input component.
 *
 * @see https://design-system.service.gov.uk/components/text-input/
 */
export function Input({ className, error, width, extraLetterSpacing, type, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'govuk-input',
        typeof width === 'number' && `govuk-input--width-${width}`,
        extraLetterSpacing && 'govuk-input--extra-letter-spacing',
        error && 'govuk-input--error',
        typeof width === 'string' && overrideClasses({ width }),
        className,
      )}
      type={type || 'text'}
      {...props}
    />
  );
}

export function InputPrefix({ className, ...props }: InputAffixProps) {
  return <div className={clsx('govuk-input__prefix', className)} aria-hidden="true" {...props} />;
}

export function InputSuffix({ className, ...props }: InputAffixProps) {
  return <div className={clsx('govuk-input__suffix', className)} aria-hidden="true" {...props} />;
}

export function InputWrapper({ className, ...props }: InputAffixProps) {
  return <div className={clsx('govuk-input__wrapper', className)} {...props} />;
}

/**
 * Help users enter information with the text input component.
 *
 * @see https://design-system.service.gov.uk/components/text-input/
 */
export function InputField({
  id: idProp,
  name,
  label,
  labelSize,
  labelIsPageHeading,
  hint,
  errorMessage,
  prefix,
  suffix,
  'aria-describedby': describedBy,
  ...props
}: InputFieldProps) {
  const id = idProp || name;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;

  const input = (
    <Input
      id={id}
      name={name}
      error={Boolean(errorId)}
      aria-describedby={joinIds(describedBy, hintId, errorId)}
      {...props}
    />
  );

  return (
    <FormGroup error={Boolean(errorId)}>
      <LabelComposite htmlFor={id} size={labelSize} isPageHeading={labelIsPageHeading}>
        {label}
      </LabelComposite>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
      {hasContent(prefix) || hasContent(suffix) ? (
        <InputWrapper>
          {hasContent(prefix) && <InputPrefix>{prefix}</InputPrefix>}
          {input}
          {hasContent(suffix) && <InputSuffix>{suffix}</InputSuffix>}
        </InputWrapper>
      ) : (
        input
      )}
    </FormGroup>
  );
}
