import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { fieldMessages, isSet, joinIds, toProps, type ContentOrProps } from '../../utils/field';
import { FormGroup, type FieldFormGroupProps } from '../../objects/form-group';
import type { ErrorMessageProps } from '../error-message';
import type { HintProps } from '../hint';
import { Label, type LabelProps } from '../label';

export type TextareaProps = ComponentProps<'textarea'> & {
  label?: ContentOrProps<LabelProps>;
  hint?: ContentOrProps<HintProps>;
  errorMessage?: ContentOrProps<ErrorMessageProps>;
  formGroup?: FieldFormGroupProps;
};

export function Textarea({
  id: idProp,
  name,
  rows,
  className,
  label,
  hint,
  errorMessage,
  formGroup: { beforeInput, afterInput, ...formGroup } = {},
  'aria-describedby': describedBy,
  ...props
}: TextareaProps) {
  const id = idProp || name;
  const { hintId, errorId, messages } = fieldMessages({ id, hint, errorMessage });

  return (
    <FormGroup error={isSet(errorMessage)} {...formGroup}>
      <Label htmlFor={id} {...toProps<LabelProps>(label)} />
      {messages}
      {beforeInput}
      <textarea
        className={clsx(
          'govuk-textarea',
          isSet(errorMessage) && 'govuk-textarea--error',
          className,
        )}
        id={id}
        name={name}
        rows={rows || 5}
        aria-describedby={joinIds(describedBy, hintId, errorId)}
        {...props}
      />
      {afterInput}
    </FormGroup>
  );
}
