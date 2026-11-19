import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds, type LegendFieldProps } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import * as Fieldset from '../fieldset';
import { Hint } from '../hint';
import { Input as Control, type InputProps as ControlProps } from '../input';
import { LabelComposite as BaseLabel, type LabelCompositeProps as BaseLabelProps } from '../label';

export type RootProps = ComponentProps<'div'>;

/**
 * Use the date input component to help users enter a memorable date.
 *
 * @see https://design-system.service.gov.uk/components/date-input/
 */
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

export type FieldProps = LegendFieldProps &
  Omit<RootProps, 'defaultValue'> & {
    /** This is used for the main component and to compose the ID attribute for each item. */
    id: string;
    /** Specify `value` attributes for the date parts. */
    values?: { day?: string; month?: string; year?: string };
    /** Optional prefix. This is used to prefix each item `name`, separated by `-`. */
    namePrefix?: string;
    /** The legend for the fieldset used by the date input component. */
    legend: ReactNode;
    /** Can be used to add a hint to a date input component. */
    hint?: ReactNode;
    /** Can be used to add an error message to the date input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. */
    errorMessage?: ReactNode;
  };

const parts = [
  { name: 'day', label: 'Day', width: 2 },
  { name: 'month', label: 'Month', width: 2 },
  { name: 'year', label: 'Year', width: 4 },
] as const;

/**
 * Use the date input component to help users enter a memorable date.
 *
 * @see https://design-system.service.gov.uk/components/date-input/
 */
export function Field({
  id,
  namePrefix,
  values,
  legend,
  legendSize,
  legendIsPageHeading,
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
        <Fieldset.LegendComposite size={legendSize} isPageHeading={legendIsPageHeading}>
          {legend}
        </Fieldset.LegendComposite>
        {hintId && <Hint id={hintId}>{hint}</Hint>}
        {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
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
