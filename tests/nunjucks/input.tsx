import type { ReactNode } from 'react';
import { ErrorMessage, FormGroup, Hint, Input, Label } from '../../src';
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

export default function input(options: Options) {
  const id = (options.id || options.name) as string | undefined;
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const prefix = subcomponent(options.prefix);
  const suffix = subcomponent(options.suffix);
  const hasPrefix = Boolean(prefix?.children);
  const hasSuffix = Boolean(suffix?.children);
  const { beforeInput, afterInput, ...group } = formGroup(options.formGroup) as {
    beforeInput?: ReactNode;
    afterInput?: ReactNode;
  };
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;

  const control = (
    <Input.Control
      {...optional('id', id)}
      {...optional('name', options.name)}
      {...optional('type', options.type)}
      {...optional('inputMode', options.inputmode)}
      {...optional('value', options.value)}
      {...optional('disabled', options.disabled || undefined)}
      {...optional('aria-describedby', describedBy(options.describedBy, hintId, errorId))}
      {...optional('autoComplete', options.autocomplete || undefined)}
      {...optional('pattern', options.pattern || undefined)}
      {...optional(
        'spellCheck',
        typeof options.spellcheck === 'boolean' ? options.spellcheck : undefined,
      )}
      {...optional('autoCapitalize', options.autocapitalize || undefined)}
      error={Boolean(error)}
      className={className(options)}
      {...attributes(options.attributes)}
    />
  );

  return (
    <FormGroup error={Boolean(error)} {...group}>
      <Label htmlFor={id} {...label(options.label)} />
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessage id={errorId} {...error} />}
      {hasPrefix || hasSuffix || beforeInput || afterInput ? (
        <Input.Wrapper {...subcomponent(options.inputWrapper)}>
          {beforeInput}
          {hasPrefix && <Input.Prefix {...prefix} />}
          {control}
          {hasSuffix && <Input.Suffix {...suffix} />}
          {afterInput}
        </Input.Wrapper>
      ) : (
        control
      )}
    </FormGroup>
  );
}
