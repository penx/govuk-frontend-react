import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds, type LegendFieldProps } from '../../utils/field';
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

export type FieldProps = LegendFieldProps &
  Omit<RootProps, 'children'> & {
    idPrefix: string;
    legend: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
  } & (
    | { children?: ReactNode; items?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        items: (ItemCompositeProps | { divider: ReactNode })[];
      }
  );

/** Children are `ItemComposite`s and `Divider`s. */

export function Field({
  idPrefix,
  legend,
  legendSize,
  legendIsPageHeading,
  hint,
  errorMessage,
  'aria-describedby': describedBy,
  items,
  children,
  ...props
}: FieldProps) {
  const hintId = isSet(hint) ? `${idPrefix}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${idPrefix}-error` : undefined;
  return (
    <FormGroup error={Boolean(errorId)}>
      <Fieldset.Root aria-describedby={joinIds(describedBy, hintId, errorId)}>
        <Fieldset.LegendComposite size={legendSize} isPageHeading={legendIsPageHeading}>
          {legend}
        </Fieldset.LegendComposite>
        {hintId && <BaseHint id={hintId}>{hint}</BaseHint>}
        {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
        <Root {...props}>
          {items
            ? items.map((item, index) =>
                'divider' in item ? (
                  <Divider key={index}>{item.divider}</Divider>
                ) : (
                  <ItemComposite key={index} {...item} />
                ),
              )
            : children}
        </Root>
      </Fieldset.Root>
    </FormGroup>
  );
}
