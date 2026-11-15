import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds } from '../../utils/field';
import { FormGroup } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import * as Fieldset from '../fieldset';
import { Hint as BaseHint, type HintProps as BaseHintProps } from '../hint';
import { LabelComposite as BaseLabel, type LabelCompositeProps as BaseLabelProps } from '../label';

export type RootProps = ComponentProps<'div'> & { inline?: boolean; small?: boolean };

export function Root({ inline, small, className, ...props }: RootProps) {
  return (
    <div
      className={clsx(
        'govuk-radios',
        inline && 'govuk-radios--inline',
        small && 'govuk-radios--small',
        className,
      )}
      data-module="govuk-radios"
      {...props}
    />
  );
}

export type ItemProps = ComponentProps<'div'>;

export function Item({ className, ...props }: ItemProps) {
  return <div className={clsx('govuk-radios__item', className)} {...props} />;
}

export type InputProps = Omit<ComponentProps<'input'>, 'type'>;

export function Input({ className, ...props }: InputProps) {
  return <input className={clsx('govuk-radios__input', className)} type="radio" {...props} />;
}

export type LabelProps = BaseLabelProps;

export function Label({ className, ...props }: LabelProps) {
  return <BaseLabel className={clsx('govuk-radios__label', className)} {...props} />;
}

export type HintProps = BaseHintProps;

export function Hint({ className, ...props }: HintProps) {
  return <BaseHint className={clsx('govuk-radios__hint', className)} {...props} />;
}

export type DividerProps = ComponentProps<'div'>;

export function Divider({ className, ...props }: DividerProps) {
  return <div className={clsx('govuk-radios__divider', className)} {...props} />;
}

export type ConditionalProps = ComponentProps<'div'> & { checked?: boolean };

export function Conditional({ checked, className, ...props }: ConditionalProps) {
  return (
    <div
      className={clsx(
        'govuk-radios__conditional',
        !checked && 'govuk-radios__conditional--hidden',
        className,
      )}
      {...props}
    />
  );
}

export type ItemCompositeProps = InputProps & {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  conditional?: ReactNode;
};

export function ItemComposite({
  id,
  label,
  hint,
  conditional,
  'aria-describedby': describedBy,
  ...props
}: ItemCompositeProps) {
  const hintId = isSet(hint) ? `${id}-item-hint` : undefined;
  const conditionalId = isSet(conditional) ? `conditional-${id}` : undefined;
  return (
    <>
      <Item>
        <Input
          id={id}
          data-aria-controls={conditionalId}
          aria-describedby={joinIds(describedBy, hintId)}
          {...props}
        />
        <Label htmlFor={id}>{label}</Label>
        {hintId && <Hint id={hintId}>{hint}</Hint>}
      </Item>
      {conditionalId && (
        <Conditional id={conditionalId} checked={Boolean(props.checked ?? props.defaultChecked)}>
          {conditional}
        </Conditional>
      )}
    </>
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
