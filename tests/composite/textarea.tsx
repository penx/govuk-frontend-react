import { Textarea } from '../../src';
import { optional } from '../nunjucks/helpers';
import { fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps, spellCheck } from './field';

export default {
  supports: [...fieldSupports, 'rows', 'value', 'autocomplete', 'spellcheck'],
  render: (options) => (
    <Textarea.Field
      {...fieldProps(options)}
      {...optional('rows', options.rows as number)}
      {...optional('defaultValue', options.value as string)}
      {...optional('autoComplete', (options.autocomplete as string) || undefined)}
      {...spellCheck(options)}
    />
  ),
} satisfies CompositeMapping;
