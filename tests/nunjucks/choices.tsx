import type { ComponentProps, ReactNode } from 'react';
import { ErrorMessageComposite, Fieldset, FormGroup, Hint } from '../../src';
import type { HintProps } from '../../src/components/hint';
import type { LabelProps } from '../../src/components/label';
import {
  attributes,
  className,
  content,
  describedBy as join,
  errorMessage,
  optional,
  subcomponent,
  type Options,
} from './helpers';

type Part<P> = (props: P) => ReactNode;
type Parts = {
  Root: Part<ComponentProps<'div'>>;
  Item: Part<ComponentProps<'div'>>;
  Input: Part<Omit<ComponentProps<'input'>, 'type'>>;
  Label: Part<LabelProps>;
  Hint: Part<HintProps>;
  Divider: Part<ComponentProps<'div'>>;
  Conditional: Part<ComponentProps<'div'> & { checked?: boolean }>;
};

type Item = Options & {
  id?: string;
  name?: string;
  value?: unknown;
  divider?: string;
  checked?: boolean;
  disabled?: boolean;
  behaviour?: string;
  label?: Options;
  hint?: Options;
  conditional?: Options;
};

export function choices(
  parts: Parts,
  options: Options,
  { checkboxes, isChecked }: { checkboxes: boolean; isChecked: (item: Item) => boolean },
) {
  const name = options.name as string | undefined;
  const idPrefix = (options.idPrefix as string) || name;
  const fieldset = options.fieldset as Options | undefined;
  const hasFieldset = Boolean(fieldset);
  let describedBy = (fieldset?.describedBy as string) || '';
  if (checkboxes && !fieldset?.describedBy) describedBy = (options.describedBy as string) || '';
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const hintId = hint && `${idPrefix}-hint`;
  const errorId = error && `${idPrefix}-error`;
  describedBy = join(describedBy, hintId, errorId) ?? '';
  const group = options.formGroup as Options | undefined;
  const beforeInputs = content(group?.beforeInputs as Options | undefined);
  const afterInputs = content(group?.afterInputs as Options | undefined);
  const items = (options.items as (Item | null)[] | undefined) ?? [];

  const renderItem = (item: Item, index: number): ReactNode => {
    const itemId = item.id || `${idPrefix}${index > 1 ? `-${index}` : ''}`;
    const conditionalId = `conditional-${itemId}`;
    if (item.divider) return <parts.Divider key={index}>{item.divider}</parts.Divider>;
    const checked = isChecked(item);
    const hasHint = Boolean(item.hint?.text || item.hint?.html);
    const itemHintId = hasHint ? `${itemId}-item-hint` : undefined;
    const itemDescribedBy = checkboxes
      ? join(hasFieldset ? '' : describedBy, itemHintId)
      : itemHintId;
    const conditional = item.conditional?.html ? content(item.conditional) : undefined;
    return [
      <parts.Item key={index}>
        <parts.Input
          id={itemId}
          name={(checkboxes && item.name) || name}
          value={item.value === undefined || item.value === null ? '' : String(item.value)}
          {...optional('defaultChecked', checked || undefined)}
          {...optional('disabled', item.disabled || undefined)}
          {...optional('data-aria-controls', conditional ? conditionalId : undefined)}
          {...optional('data-behaviour', checkboxes ? item.behaviour : undefined)}
          {...optional('aria-describedby', itemDescribedBy)}
          {...attributes(item.attributes)}
        />
        <parts.Label
          htmlFor={itemId}
          className={className(item.label)}
          {...attributes(item.label?.attributes)}
        >
          {content(item)}
        </parts.Label>
        {hasHint ? (
          <parts.Hint
            id={itemHintId}
            className={className(item.hint)}
            {...attributes(item.hint?.attributes)}
          >
            {content(item.hint)}
          </parts.Hint>
        ) : null}
      </parts.Item>,
      conditional ? (
        <parts.Conditional key={`${index}-conditional`} checked={checked} id={conditionalId}>
          {conditional}
        </parts.Conditional>
      ) : null,
    ];
  };

  const inner = (
    <>
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessageComposite id={errorId} {...error} />}
      <parts.Root className={className(options)} {...attributes(options.attributes)}>
        {beforeInputs}
        {items.map((item, index) => (item ? renderItem(item, index + 1) : null))}
        {afterInputs}
      </parts.Root>
    </>
  );
  const legend = fieldset?.legend as Options | undefined;

  return (
    <FormGroup
      error={Boolean(error)}
      className={className(options.formGroup as Options)}
      {...attributes((options.formGroup as Options | undefined)?.attributes)}
    >
      {fieldset ? (
        <Fieldset.Root
          {...optional('aria-describedby', describedBy || undefined)}
          className={className(fieldset)}
          {...attributes(fieldset.attributes)}
        >
          {legend && (
            <Fieldset.LegendComposite
              className={className(legend)}
              isPageHeading={Boolean(legend.isPageHeading)}
            >
              {content(legend)}
            </Fieldset.LegendComposite>
          )}
          {inner}
        </Fieldset.Root>
      ) : (
        inner
      )}
    </FormGroup>
  );
}
