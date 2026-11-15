import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import * as Fieldset from '../fieldset';
import { Hint as BaseHint, type HintProps as BaseHintProps } from '../hint';
import { LabelComposite as BaseLabel, type LabelCompositeProps as BaseLabelProps } from '../label';

export type RootProps = ComponentProps<'div'> & { small?: boolean };

export function Root({ small, className, ...props }: RootProps) {
  return (
    <div
      className={clsx('govuk-checkboxes', small && 'govuk-checkboxes--small', className)}
      data-module="govuk-checkboxes"
      {...props}
    />
  );
}

export type ItemProps = ComponentProps<'div'>;

export function Item({ className, ...props }: ItemProps) {
  return <div className={clsx('govuk-checkboxes__item', className)} {...props} />;
}

export type InputProps = Omit<ComponentProps<'input'>, 'type'>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input className={clsx('govuk-checkboxes__input', className)} type="checkbox" {...props} />
  );
}

export type LabelProps = BaseLabelProps;

export function Label({ className, ...props }: LabelProps) {
  return <BaseLabel className={clsx('govuk-checkboxes__label', className)} {...props} />;
}

export type HintProps = BaseHintProps;

export function Hint({ className, ...props }: HintProps) {
  return <BaseHint className={clsx('govuk-checkboxes__hint', className)} {...props} />;
}

export type DividerProps = ComponentProps<'div'>;

export function Divider({ className, ...props }: DividerProps) {
  return <div className={clsx('govuk-checkboxes__divider', className)} {...props} />;
}

export type ConditionalProps = ComponentProps<'div'> & { checked?: boolean };

export function Conditional({ checked, className, ...props }: ConditionalProps) {
  return (
    <div
      className={clsx(
        'govuk-checkboxes__conditional',
        !checked && 'govuk-checkboxes__conditional--hidden',
        className,
      )}
      {...props}
    />
  );
}

export type FieldProps = RootProps & {
  idPrefix: string;
  legend: ReactNode;
  hint?: ReactNode;
  errorMessage?: ReactNode;
};

export function Field({
  idPrefix,
  legend,
  hint,
  errorMessage,
  'aria-describedby': describedBy,
  ...props
}: FieldProps) {
  const hintId = isSet(hint) ? `${idPrefix}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${idPrefix}-error` : undefined;
  return (
    <FormGroup error={Boolean(errorId)}>
      <Fieldset.Root aria-describedby={joinIds(describedBy, hintId, errorId)}>
        <Fieldset.LegendComposite>{legend}</Fieldset.LegendComposite>
        {hintId && <BaseHint id={hintId}>{hint}</BaseHint>}
        {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
        <Root {...props} />
      </Fieldset.Root>
    </FormGroup>
  );
}
