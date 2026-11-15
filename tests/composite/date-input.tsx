import { DateInput } from '../../src';
import { optional, type Options } from '../nunjucks/helpers';
import { contentOf, type CompositeMapping } from './helpers';
import { sub } from './field';

// The macro keys values by full input name. The Field keys them by day, month and year.
function values(options: Options) {
  if (!options.values) return undefined;
  const prefix = options.namePrefix ? `${String(options.namePrefix)}-` : '';
  return Object.fromEntries(
    Object.entries(options.values as Record<string, unknown>).map(([key, value]) => [
      key.startsWith(prefix) ? key.slice(prefix.length) : key,
      String(value),
    ]),
  );
}

export default {
  supports: [
    'id',
    'namePrefix',
    'values',
    'classes',
    'attributes',
    'fieldset.legend.text',
    'fieldset.legend.html',
    'fieldset.describedBy',
    ...contentOf('hint', 'errorMessage'),
  ],
  render: (options) => {
    const fieldset = options.fieldset as Options | undefined;
    if (!fieldset?.legend) return null;
    return (
      <DateInput.Field
        id={options.id as string}
        {...optional('namePrefix', options.namePrefix as string)}
        {...optional('values', values(options))}
        legend={sub(fieldset.legend)}
        hint={sub(options.hint)}
        errorMessage={sub(options.errorMessage)}
        {...optional('aria-describedby', fieldset.describedBy as string)}
        className={options.classes as string | undefined}
      />
    );
  },
} satisfies CompositeMapping;
