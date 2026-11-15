import { ErrorMessageComposite, Hint, LabelComposite, PasswordInput } from '../../src';
import {
  attributes,
  className,
  content,
  describedBy,
  errorMessage,
  label,
  optional,
  subcomponent,
  type Options,
} from './helpers';

const texts = [
  'showPasswordText',
  'hidePasswordText',
  'showPasswordAriaLabelText',
  'hidePasswordAriaLabelText',
  'passwordShownAnnouncementText',
  'passwordHiddenAnnouncementText',
] as const;

export default function passwordInput(options: Options) {
  const id = (options.id || options.name) as string;
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;
  const group = (options.formGroup as Options | undefined) ?? {};
  const button = options.button as Options | undefined;

  return (
    <PasswordInput.Root
      error={Boolean(error)}
      {...Object.assign({}, ...texts.map((key) => optional(key, options[key] as string)))}
      className={className(group)}
      {...attributes(group.attributes)}
    >
      <LabelComposite htmlFor={id} {...label(options.label)} />
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessageComposite id={errorId} {...error} />}
      <PasswordInput.Wrapper>
        {content(group.beforeInput as Options | undefined)}
        <PasswordInput.Input
          id={id}
          {...optional('name', options.name)}
          {...optional('defaultValue', options.value as string | undefined)}
          {...optional('disabled', options.disabled || undefined)}
          {...optional('autoComplete', options.autocomplete as string | undefined)}
          {...optional('aria-describedby', describedBy(options.describedBy, hintId, errorId))}
          error={Boolean(error)}
          className={className(options)}
          {...attributes(options.attributes)}
        />
        <PasswordInput.Toggle
          aria-controls={id}
          {...optional('aria-label', options.showPasswordAriaLabelText as string | undefined)}
          className={className(button)}
        >
          {options.showPasswordText as string | undefined}
        </PasswordInput.Toggle>
        {content(group.afterInput as Options | undefined)}
      </PasswordInput.Wrapper>
    </PasswordInput.Root>
  );
}
