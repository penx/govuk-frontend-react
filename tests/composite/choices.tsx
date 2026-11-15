import type { ComponentProps, ReactNode } from 'react';
import type * as Checkboxes from '../../src/components/checkboxes';
import { attributes, content, optional, type Options } from '../nunjucks/helpers';
import { contentOf, sizeFromClasses } from './helpers';
import { sub } from './field';

type Parts = {
  Field: (props: Checkboxes.FieldProps) => ReactNode;
  ItemComposite: (props: Checkboxes.ItemCompositeProps) => ReactNode;
  Divider: (props: ComponentProps<'div'>) => ReactNode;
};

type Item = Options & {
  id?: string;
  name?: string;
  value?: unknown;
  divider?: string;
  checked?: boolean;
  disabled?: boolean;
  hint?: Options;
  conditional?: Options;
};

export const choicesSupports = [
  'idPrefix',
  'name',
  'fieldset.legend.text',
  'fieldset.legend.html',
  'fieldset.legend.classes',
  'fieldset.legend.isPageHeading',
  'fieldset.describedBy',
  'classes',
  'attributes',
  ...contentOf('hint', 'errorMessage'),
  ...['text', 'html', 'id', 'name', 'value', 'checked', 'disabled', 'divider'].map(
    (key) => `items.*.${key}`,
  ),
  ...contentOf('items.*.hint'),
  'items.*.conditional.html',
];

export function renderChoices(parts: Parts, options: Options, isChecked: (item: Item) => boolean) {
  const fieldset = options.fieldset as Options | undefined;
  if (!fieldset?.legend) return null;
  const legend = fieldset.legend as Options;
  const legendSize = sizeFromClasses(legend.classes, 'govuk-fieldset__legend');
  if (legendSize === false) return null;
  const name = options.name as string;
  const idPrefix = (options.idPrefix as string) || name;
  const items = ((options.items as (Item | null)[] | undefined) ?? []).filter(Boolean) as Item[];
  return (
    <parts.Field
      idPrefix={idPrefix}
      legend={sub(legend)}
      {...optional('legendSize', legendSize)}
      {...optional('legendIsPageHeading', (legend.isPageHeading as boolean) || undefined)}
      hint={sub(options.hint)}
      errorMessage={sub(options.errorMessage)}
      {...optional('aria-describedby', (fieldset.describedBy as string) || undefined)}
      className={options.classes as string | undefined}
      {...attributes(options.attributes)}
    >
      {items.map((item, index) => {
        if (item.divider) return <parts.Divider key={index}>{item.divider}</parts.Divider>;
        const id = item.id || `${idPrefix}${index > 0 ? `-${index + 1}` : ''}`;
        return (
          <parts.ItemComposite
            key={index}
            id={id}
            name={item.name || name}
            value={item.value === undefined || item.value === null ? '' : String(item.value)}
            {...optional('defaultChecked', isChecked(item) || undefined)}
            {...optional('disabled', item.disabled || undefined)}
            label={content(item)}
            hint={sub(item.hint)}
            conditional={item.conditional?.html ? content(item.conditional) : undefined}
          />
        );
      })}
    </parts.Field>
  );
}
