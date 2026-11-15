import type { ReactNode } from 'react';
import { ErrorMessage, FormGroup, Hint, Label, Textarea } from '../../src';
import {
  attributes,
  className,
  describedBy,
  errorMessage,
  formGroup,
  label,
  optional,
  subcomponent,
  type Options,
} from './helpers';

export default function textarea(options: Options) {
  const id = (options.id || options.name) as string | undefined;
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const { beforeInput, afterInput, ...group } = formGroup(options.formGroup) as {
    beforeInput?: ReactNode;
    afterInput?: ReactNode;
  };
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;

  return (
    <FormGroup error={Boolean(error)} {...group}>
      <Label htmlFor={id} {...label(options.label)} />
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessage id={errorId} {...error} />}
      {beforeInput}
      <Textarea.Control
        {...optional('id', id)}
        {...optional('name', options.name)}
        {...optional('rows', options.rows)}
        {...optional('defaultValue', options.value)}
        {...optional('disabled', options.disabled || undefined)}
        {...optional('aria-describedby', describedBy(options.describedBy, hintId, errorId))}
        {...optional('autoComplete', options.autocomplete || undefined)}
        {...optional(
          'spellCheck',
          typeof options.spellcheck === 'boolean' ? options.spellcheck : undefined,
        )}
        error={Boolean(error)}
        className={className(options)}
        {...attributes(options.attributes)}
      />
      {afterInput}
    </FormGroup>
  );
}
