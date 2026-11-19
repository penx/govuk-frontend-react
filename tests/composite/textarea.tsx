import { TextareaField } from '../../src';
import { optional, widthAndClassName } from '../nunjucks/helpers';
import { fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps, spellCheck, labelExpressible } from './field';

export default {
  supports: [...fieldSupports, 'rows', 'value', 'autocomplete', 'spellcheck'],
  render: (options) =>
    !labelExpressible(options) ? null : (
      <TextareaField
        {...fieldProps(options)}
        {...widthAndClassName(options)}
        {...optional('rows', options.rows as number)}
        {...optional('defaultValue', options.value as string)}
        {...optional('autoComplete', (options.autocomplete as string) || undefined)}
        {...spellCheck(options)}
      />
    ),
} satisfies CompositeMapping;
