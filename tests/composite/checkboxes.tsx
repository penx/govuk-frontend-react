import { Checkboxes } from '../../src';
import type { CompositeMapping } from './helpers';
import { choicesSupports, renderChoices } from './choices';

export default {
  supports: [...choicesSupports, 'values'],
  render: (options) => {
    const values = options.values as unknown[] | undefined;
    return renderChoices(Checkboxes, options, (item) =>
      Boolean(item.checked || (values?.includes(item.value) && item.checked !== false)),
    );
  },
} satisfies CompositeMapping;
