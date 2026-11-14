import { Textarea } from '../../src';
import {
  attributes,
  className,
  errorMessage,
  formGroup,
  label,
  optional,
  subcomponent,
  type Options,
} from './helpers';

export default function textarea(options: Options) {
  return (
    <Textarea
      {...optional('id', options.id)}
      {...optional('name', options.name)}
      {...optional('rows', options.rows)}
      {...optional('defaultValue', options.value)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('aria-describedby', options.describedBy || undefined)}
      {...optional('autoComplete', options.autocomplete || undefined)}
      {...optional(
        'spellCheck',
        typeof options.spellcheck === 'boolean' ? options.spellcheck : undefined,
      )}
      className={className(options)}
      label={label(options.label)}
      hint={subcomponent(options.hint)}
      errorMessage={errorMessage(options.errorMessage)}
      formGroup={formGroup(options.formGroup)}
      {...attributes(options.attributes)}
    />
  );
}
