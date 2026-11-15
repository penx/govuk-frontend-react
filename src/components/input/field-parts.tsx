import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export { FormGroup as Root, type FormGroupProps as RootProps } from '../../objects/form-group';
export { ErrorMessage, type ErrorMessageProps } from '../error-message';
export { Hint, type HintProps } from '../hint';
export { Label, type LabelProps } from '../label';

export type ControlProps = Omit<ComponentProps<'input'>, 'width'> & {
  error?: boolean;
  width?: 2 | 3 | 4 | 5 | 10 | 20 | 30;
  extraLetterSpacing?: boolean;
};

export type AffixProps = ComponentProps<'div'>;

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
