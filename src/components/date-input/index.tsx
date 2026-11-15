import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessage } from '../error-message';
import * as Fieldset from '../fieldset';
import { Hint } from '../hint';
import { Control, type ControlProps } from '../input';
import { Label as BaseLabel, type LabelProps as BaseLabelProps } from '../label';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-date-input', className)} {...props} />;
}

export type ItemProps = ComponentProps<'div'>;

export function Item({ className, ...props }: ItemProps) {
  return <div className={clsx('govuk-date-input__item', className)} {...props} />;
}

export type LabelProps = BaseLabelProps;

export function Label({ className, ...props }: LabelProps) {
  return <BaseLabel className={clsx('govuk-date-input__label', className)} {...props} />;
}

export type InputProps = ControlProps;

export function Input({ className, inputMode = 'numeric', ...props }: InputProps) {
  return (
    <Control
      className={clsx('govuk-date-input__input', className)}
      inputMode={inputMode}
      {...props}
    />
  );
}

export type FieldProps = Omit<RootProps, 'defaultValue'> & {
  id: string;
  values?: { day?: string; month?: string; year?: string };
  namePrefix?: string;
  legend: ReactNode;
  hint?: ReactNode;
  errorMessage?: ReactNode;
};

const parts = [
  { name: 'day', label: 'Day', width: 2 },
  { name: 'month', label: 'Month', width: 2 },
  { name: 'year', label: 'Year', width: 4 },
] as const;

export function Field({
  id,
  namePrefix,
  values,
  legend,
  hint,
  errorMessage,
  'aria-describedby': describedBy,
  children,
  ...props
}: FieldProps) {
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;
  return (
    <FormGroup error={Boolean(errorId)}>
      <Fieldset.Root role="group" aria-describedby={joinIds(describedBy, hintId, errorId)}>
        <Fieldset.Legend>{legend}</Fieldset.Legend>
        {hintId && <Hint id={hintId}>{hint}</Hint>}
        {errorId && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
        <Root id={id} {...props}>
          {children ??
            parts.map((part) => (
              <Item key={part.name}>
                <FormGroup>
                  <Label htmlFor={`${id}-${part.name}`}>{part.label}</Label>
                  <Input
                    id={`${id}-${part.name}`}
                    name={namePrefix ? `${namePrefix}-${part.name}` : part.name}
                    width={part.width}
                    error={Boolean(errorId)}
                    defaultValue={values?.[part.name]}
                  />
                </FormGroup>
              </Item>
            ))}
        </Root>
      </Fieldset.Root>
    </FormGroup>
  );
}
