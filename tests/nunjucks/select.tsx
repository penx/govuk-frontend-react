import type { ReactNode } from 'react';
import { ErrorMessage, FormGroup, Hint, Label, Select } from '../../src';
import {
  attributes,
  className,
  describedBy,
  errorMessage,
  formGroup,
  label,
  optional,
  subcomponent,
  type Options,
} from './helpers';

type Item = {
  text?: string;
  value?: unknown;
  selected?: boolean;
  disabled?: boolean;
  attributes?: unknown;
};

const effectiveValue = (item: Item) => String(item.value ?? item.text);

function selectedValue(items: Item[], value: unknown) {
  const selected =
    items.find((item) => item.selected) ??
    (value
      ? items.find((item) => item.selected !== false && effectiveValue(item) == String(value))
      : undefined);
  return selected && effectiveValue(selected);
}

export default function select(options: Options) {
  const items = ((options.items as Item[] | undefined) ?? []).filter(Boolean);
  const id = (options.id || options.name) as string | undefined;
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const { beforeInput, afterInput, ...group } = formGroup(options.formGroup) as {
    beforeInput?: ReactNode;
    afterInput?: ReactNode;
  };
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;

  return (
    <FormGroup error={Boolean(error)} {...group}>
      <Label htmlFor={id} {...label(options.label)} />
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessage id={errorId} {...error} />}
      {beforeInput}
      <Select.Root
        {...optional('id', id)}
        {...optional('name', options.name)}
        {...optional('defaultValue', selectedValue(items, options.value))}
        {...optional('disabled', options.disabled || undefined)}
        {...optional('aria-describedby', describedBy(options.describedBy, hintId, errorId))}
        error={Boolean(error)}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {items.map((item, index) => (
          <option
            key={index}
            {...optional('value', item.value === undefined ? undefined : String(item.value))}
            {...optional('disabled', item.disabled || undefined)}
            {...attributes(item.attributes)}
          >
            {item.text}
          </option>
        ))}
      </Select.Root>
      {afterInput}
    </FormGroup>
  );
}
