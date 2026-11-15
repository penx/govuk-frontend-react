import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import * as FieldParts from './field-parts';
import { hasContent } from '../../utils/has-content';
import { isSet, joinIds } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessage } from '../error-message';
import { Hint } from '../hint';
import { Label } from '../label';

export { FieldParts };

export type ControlProps = Omit<ComponentProps<'input'>, 'width'> & {
  error?: boolean;
  width?: 2 | 3 | 4 | 5 | 10 | 20 | 30;
  extraLetterSpacing?: boolean;
};

export type AffixProps = ComponentProps<'div'>;

export type FieldProps = Omit<ControlProps, 'error' | 'prefix'> & {
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
        width && `govuk-input--width-${width}`,
        extraLetterSpacing && 'govuk-input--extra-letter-spacing',
        error && 'govuk-input--error',
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
      <Label htmlFor={id}>{label}</Label>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
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
