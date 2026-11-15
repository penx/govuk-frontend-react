import { Input } from '../../src';
import { optional, widthAndClassName } from '../nunjucks/helpers';
import { contentOf, fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps, spellCheck, sub, labelExpressible } from './field';

export default {
  supports: [
    ...fieldSupports,
    'type',
    'inputmode',
    'value',
    'autocomplete',
    'pattern',
    'spellcheck',
    'autocapitalize',
    ...contentOf('prefix', 'suffix'),
  ],
  render: (options) =>
    !labelExpressible(options) ? null : (
      <Input.Field
        {...fieldProps(options)}
        {...widthAndClassName(options, 'govuk-input')}
        {...optional('type', options.type as string)}
        {...optional('inputMode', options.inputmode as 'text')}
        {...optional('defaultValue', options.value as string)}
        {...optional('autoComplete', (options.autocomplete as string) || undefined)}
        {...optional('pattern', (options.pattern as string) || undefined)}
        {...spellCheck(options)}
        {...optional('autoCapitalize', (options.autocapitalize as string) || undefined)}
        prefix={sub(options.prefix)}
        suffix={sub(options.suffix)}
      />
    ),
} satisfies CompositeMapping;
