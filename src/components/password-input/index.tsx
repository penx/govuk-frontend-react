import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { i18nAttributes } from '../../utils/i18n';
import { FormGroup, type FormGroupProps } from '../../objects/form-group';
import { Root as Button } from '../button';
import { ErrorMessageComposite } from '../error-message';
import { Hint } from '../hint';
import { Control, type ControlProps, Wrapper as InputWrapper } from '../input';
import { LabelComposite } from '../label';

export type RootProps = FormGroupProps & {
  showPasswordText?: string;
  hidePasswordText?: string;
  showPasswordAriaLabelText?: string;
  hidePasswordAriaLabelText?: string;
  passwordShownAnnouncementText?: string;
  passwordHiddenAnnouncementText?: string;
};

export function Root({
  showPasswordText,
  hidePasswordText,
  showPasswordAriaLabelText,
  hidePasswordAriaLabelText,
  passwordShownAnnouncementText,
  passwordHiddenAnnouncementText,
  className,
  ...props
}: RootProps) {
  return (
    <FormGroup
      className={clsx('govuk-password-input', className)}
      data-module="govuk-password-input"
      {...i18nAttributes('show-password', showPasswordText)}
      {...i18nAttributes('hide-password', hidePasswordText)}
      {...i18nAttributes('show-password-aria-label', showPasswordAriaLabelText)}
      {...i18nAttributes('hide-password-aria-label', hidePasswordAriaLabelText)}
      {...i18nAttributes('password-shown-announcement', passwordShownAnnouncementText)}
      {...i18nAttributes('password-hidden-announcement', passwordHiddenAnnouncementText)}
      {...props}
    />
  );
}

export type WrapperProps = ComponentProps<'div'>;

export function Wrapper({ className, ...props }: WrapperProps) {
  return <InputWrapper className={clsx('govuk-password-input__wrapper', className)} {...props} />;
}

export type InputProps = ControlProps;

export function Input({ className, autoComplete, ...props }: InputProps) {
  return (
    <Control
      className={clsx('govuk-password-input__input', 'govuk-js-password-input-input', className)}
      type="password"
      spellCheck={false}
      autoComplete={autoComplete || 'current-password'}
      autoCapitalize="none"
      {...props}
    />
  );
}

export type ToggleProps = ComponentProps<'button'>;

export function Toggle({
  className,
  children,
  'aria-label': ariaLabel = 'Show password',
  ...props
}: ToggleProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      className={clsx('govuk-password-input__toggle', 'govuk-js-password-input-toggle', className)}
      aria-label={ariaLabel}
      hidden
      {...props}
    >
      {hasContent(children) ? children : 'Show'}
    </Button>
  );
}

export type FieldProps = LabelFieldProps &
  Omit<InputProps, 'error'> &
  Omit<RootProps, keyof FormGroupProps> & {
    label?: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
  };

export function Field({
  id: idProp,
  name,
  label,
  labelSize,
  labelIsPageHeading,
  hint,
  errorMessage,
  showPasswordText,
  hidePasswordText,
  showPasswordAriaLabelText,
  hidePasswordAriaLabelText,
  passwordShownAnnouncementText,
  passwordHiddenAnnouncementText,
  'aria-describedby': describedBy,
  ...props
}: FieldProps) {
  const id = idProp || name;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;

  return (
    <Root
      error={Boolean(errorId)}
      showPasswordText={showPasswordText}
      hidePasswordText={hidePasswordText}
      showPasswordAriaLabelText={showPasswordAriaLabelText}
      hidePasswordAriaLabelText={hidePasswordAriaLabelText}
      passwordShownAnnouncementText={passwordShownAnnouncementText}
      passwordHiddenAnnouncementText={passwordHiddenAnnouncementText}
    >
      <LabelComposite htmlFor={id} size={labelSize} isPageHeading={labelIsPageHeading}>
        {label}
      </LabelComposite>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
      <Wrapper>
        <Input
          id={id}
          name={name}
          error={Boolean(errorId)}
          aria-describedby={joinIds(describedBy, hintId, errorId)}
          {...props}
        />
        <Toggle aria-controls={id} aria-label={showPasswordAriaLabelText}>
          {showPasswordText}
        </Toggle>
      </Wrapper>
    </Root>
  );
}
