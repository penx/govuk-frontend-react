import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { fieldMessages, isSet, joinIds, toProps, type ContentOrProps } from '../../utils/field';
import { hasContent } from '../../utils/is-props-object';
import { FormGroup, type FieldFormGroupProps } from '../../objects/form-group';
import type { ErrorMessageProps } from '../error-message';
import type { HintProps } from '../hint';
import { Label, type LabelProps } from '../label';

export type AffixProps = ComponentProps<'div'>;

export type RootProps = Omit<ComponentProps<'input'>, 'prefix'> & {
  label?: ContentOrProps<LabelProps>;
  hint?: ContentOrProps<HintProps>;
  errorMessage?: ContentOrProps<ErrorMessageProps>;
  prefix?: ContentOrProps<AffixProps>;
  suffix?: ContentOrProps<AffixProps>;
  formGroup?: FieldFormGroupProps;
  inputWrapper?: ComponentProps<'div'>;
};

export function Prefix({ className, ...props }: AffixProps) {
  return <div className={clsx('govuk-input__prefix', className)} aria-hidden="true" {...props} />;
}

export function Suffix({ className, ...props }: AffixProps) {
  return <div className={clsx('govuk-input__suffix', className)} aria-hidden="true" {...props} />;
}

export function Wrapper({ className, ...props }: AffixProps) {
  return <div className={clsx('govuk-input__wrapper', className)} {...props} />;
}

export function Root({
  id: idProp,
  name,
  type,
  className,
  label,
  hint,
  errorMessage,
  prefix,
  suffix,
  formGroup: { beforeInput, afterInput, ...formGroup } = {},
  inputWrapper,
  'aria-describedby': describedBy,
  ...props
}: RootProps) {
  const id = idProp || name;
  const { hintId, errorId, messages } = fieldMessages({ id, hint, errorMessage });
  const prefixProps = toProps<AffixProps>(prefix);
  const suffixProps = toProps<AffixProps>(suffix);
  const hasPrefix = hasContent(prefixProps.children);
  const hasSuffix = hasContent(suffixProps.children);

  const input = (
    <input
      className={clsx('govuk-input', isSet(errorMessage) && 'govuk-input--error', className)}
      id={id}
      name={name}
      type={type || 'text'}
      aria-describedby={joinIds(describedBy, hintId, errorId)}
      {...props}
    />
  );

  return (
    <FormGroup error={isSet(errorMessage)} {...formGroup}>
      <Label htmlFor={id} {...toProps<LabelProps>(label)} />
      {messages}
      {hasPrefix || hasSuffix || hasContent(beforeInput) || hasContent(afterInput) ? (
        <Wrapper {...inputWrapper}>
          {beforeInput}
          {hasPrefix && <Prefix {...prefixProps} />}
          {input}
          {hasSuffix && <Suffix {...suffixProps} />}
          {afterInput}
        </Wrapper>
      ) : (
        input
      )}
    </FormGroup>
  );
}
