import { Radios } from '../../src';
import { choices } from './choices';
import type { Options } from './helpers';

export default function radios(options: Options) {
  return choices(Radios, options, {
    checkboxes: false,
    isChecked: (item) =>
      Boolean(
        item.checked ||
        (options.value ? item.value == options.value && item.checked !== false : false),
      ),
  });
}
