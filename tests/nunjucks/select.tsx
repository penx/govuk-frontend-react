import { Select } from '../../src';
import {
  attributes,
  className,
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

  return (
    <Select
      {...optional('id', options.id)}
      {...optional('name', options.name)}
      {...optional('defaultValue', selectedValue(items, options.value))}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('aria-describedby', options.describedBy || undefined)}
      className={className(options)}
      label={label(options.label)}
      hint={subcomponent(options.hint)}
      errorMessage={errorMessage(options.errorMessage)}
      formGroup={formGroup(options.formGroup)}
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
    </Select>
  );
}
