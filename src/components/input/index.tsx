import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { widthClass, type FluidWidth } from '../../utils/overrides';
import { hasContent } from '../../utils/has-content';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { LabelComposite } from '../label';

export type ControlProps = Omit<ComponentProps<'input'>, 'width'> & {
  error?: boolean;
  /** A number of characters, or a fraction of the container. */
  width?: 2 | 3 | 4 | 5 | 10 | 20 | 30 | FluidWidth;
  extraLetterSpacing?: boolean;
};

export type AffixProps = ComponentProps<'div'>;

export type FieldProps = LabelFieldProps &
  Omit<ControlProps, 'error' | 'prefix'> & {
    label?: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
  };

export function Control({
  className,
  error,
  width,
  extraLetterSpacing,
  type,
  ...props
}: ControlProps) {
  return (
    <input
      className={clsx(
        'govuk-input',
        typeof width === 'number' && `govuk-input--width-${width}`,
        extraLetterSpacing && 'govuk-input--extra-letter-spacing',
        error && 'govuk-input--error',
        typeof width === 'string' && widthClass(width),
        className,
      )}
      type={type || 'text'}
      {...props}
    />
  );
}

export function Prefix({ className, ...props }: AffixProps) {
  return <div className={clsx('govuk-input__prefix', className)} aria-hidden="true" {...props} />;
}

export function Suffix({ className, ...props }: AffixProps) {
  return <div className={clsx('govuk-input__suffix', className)} aria-hidden="true" {...props} />;
}

export function Wrapper({ className, ...props }: AffixProps) {
  return <div className={clsx('govuk-input__wrapper', className)} {...props} />;
}

export function Field({
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
}: FieldProps) {
  const id = idProp || name;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;

  const input = (
    <Control
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
        <Wrapper>
          {hasContent(prefix) && <Prefix>{prefix}</Prefix>}
          {input}
          {hasContent(suffix) && <Suffix>{suffix}</Suffix>}
        </Wrapper>
      ) : (
        input
      )}
    </FormGroup>
  );
}
