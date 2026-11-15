import { Radios } from '../../src';
import type { CompositeMapping } from './helpers';
import { choicesSupports, renderChoices } from './choices';

export default {
  supports: [...choicesSupports, 'value'],
  render: (options) =>
    renderChoices(Radios, options, (item) =>
      Boolean(
        item.checked || (options.value && item.value == options.value && item.checked !== false),
      ),
    ),
} satisfies CompositeMapping;
