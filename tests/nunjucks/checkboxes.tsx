import { Checkboxes } from '../../src';
import { choices } from './choices';
import type { Options } from './helpers';

export default function checkboxes(options: Options) {
  const values = options.values as unknown[] | undefined;
  return choices(Checkboxes, options, {
    checkboxes: true,
    isChecked: (item) =>
      Boolean(
        item.checked || (values ? values.includes(item.value) && item.checked !== false : false),
      ),
  });
}
