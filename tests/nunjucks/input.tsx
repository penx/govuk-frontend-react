import { Input } from '../../src';
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

export default function input(options: Options) {
  return (
    <Input.Root
      {...optional('id', options.id)}
      {...optional('name', options.name)}
      {...optional('type', options.type)}
      {...optional('inputMode', options.inputmode)}
      {...optional('value', options.value)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('aria-describedby', options.describedBy || undefined)}
      {...optional('autoComplete', options.autocomplete || undefined)}
      {...optional('pattern', options.pattern || undefined)}
      {...optional(
        'spellCheck',
        typeof options.spellcheck === 'boolean' ? options.spellcheck : undefined,
      )}
      {...optional('autoCapitalize', options.autocapitalize || undefined)}
      className={className(options)}
      label={label(options.label)}
      hint={subcomponent(options.hint)}
      errorMessage={errorMessage(options.errorMessage)}
      prefix={subcomponent(options.prefix)}
      suffix={subcomponent(options.suffix)}
      formGroup={formGroup(options.formGroup)}
      inputWrapper={subcomponent(options.inputWrapper)}
      {...attributes(options.attributes)}
    />
  );
}
