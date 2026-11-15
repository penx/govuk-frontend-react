import { PasswordInput } from '../../src';
import { optional } from '../nunjucks/helpers';
import { fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps } from './field';

const texts = [
  'showPasswordText',
  'hidePasswordText',
  'showPasswordAriaLabelText',
  'hidePasswordAriaLabelText',
  'passwordShownAnnouncementText',
  'passwordHiddenAnnouncementText',
];

export default {
  supports: [...fieldSupports, 'value', 'autocomplete', ...texts],
  render: (options) => (
    <PasswordInput.Field
      {...fieldProps(options)}
      {...optional('defaultValue', options.value as string)}
      {...optional('autoComplete', options.autocomplete as string)}
      {...Object.assign({}, ...texts.map((key) => optional(key, options[key] as string)))}
    />
  ),
} satisfies CompositeMapping;
