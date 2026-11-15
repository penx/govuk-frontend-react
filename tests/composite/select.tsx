import { Select } from '../../src';
import { attributes, optional, widthAndClassName } from '../nunjucks/helpers';
import { fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps, labelExpressible } from './field';

type Item = { text?: string; value?: unknown; selected?: boolean; disabled?: boolean };

const effectiveValue = (item: Item) => String(item.value ?? item.text);

export default {
  supports: [
    ...fieldSupports,
    'value',
    'items.*.text',
    'items.*.value',
    'items.*.selected',
    'items.*.disabled',
    'items.*.attributes',
  ],
  render: (options) => {
    if (!labelExpressible(options)) return null;
    const items = ((options.items as Item[] | undefined) ?? []).filter(Boolean);
    const selected =
      items.find((item) => item.selected) ??
      (options.value
        ? items.find(
            (item) => item.selected !== false && effectiveValue(item) == String(options.value),
          )
        : undefined);
    return (
      <Select.Field
        {...fieldProps(options)}
        {...widthAndClassName(options)}
        {...optional('defaultValue', selected && effectiveValue(selected))}
      >
        {items.map((item, index) => (
          <option
            key={index}
            {...optional('value', item.value === undefined ? undefined : String(item.value))}
            {...optional('disabled', item.disabled || undefined)}
            {...attributes((item as { attributes?: unknown }).attributes)}
          >
            {item.text}
          </option>
        ))}
      </Select.Field>
    );
  },
} satisfies CompositeMapping;
