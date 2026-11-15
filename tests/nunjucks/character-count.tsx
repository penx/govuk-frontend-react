import { CharacterCount, ErrorMessage, Hint, Label } from '../../src';
import type { Translation } from '../../src/utils/i18n';
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

export default function characterCount(options: Options) {
  const id = (options.id || options.name) as string;
  const maxlength = options.maxlength as number | undefined;
  const maxwords = options.maxwords as number | undefined;
  const countType = (options.countType as 'words') || (maxwords ? 'words' : undefined);
  const limit = maxwords || maxlength;
  const description =
    (options.textareaDescriptionText as string) ||
    `You can enter up to %{count} ${countType === 'words' ? 'words' : 'characters'}`;
  const hint = subcomponent(options.hint);
  const error = errorMessage(options.errorMessage);
  const hintId = hint && `${id}-hint`;
  const errorId = error && `${id}-error`;
  const group = (options.formGroup as Options | undefined) ?? {};
  const countMessage = options.countMessage as Options | undefined;
  const translation = (key: string) => optional(key, options[key] as Translation | undefined);

  return (
    <CharacterCount.Root
      error={Boolean(error)}
      {...optional('maxLength', maxlength)}
      {...optional('maxWords', maxwords)}
      {...optional('threshold', options.threshold as number | undefined)}
      {...optional('countType', options.countType as 'words' | undefined)}
      {...optional('textareaDescriptionText', options.textareaDescriptionText as string)}
      {...translation('charactersUnderLimitText')}
      {...translation('charactersAtLimitText')}
      {...translation('charactersOverLimitText')}
      {...translation('wordsUnderLimitText')}
      {...translation('wordsAtLimitText')}
      {...translation('wordsOverLimitText')}
      className={className(group)}
      {...attributes(group.attributes)}
    >
      <Label htmlFor={id} {...label(options.label)} />
      {hint && <Hint id={hintId} {...hint} />}
      {error && <ErrorMessage id={errorId} {...error} />}
      {content(group.beforeInput as Options | undefined)}
      <CharacterCount.Textarea
        id={id}
        {...optional('name', options.name)}
        {...optional('rows', options.rows as number | undefined)}
        {...optional(
          'spellCheck',
          typeof options.spellcheck === 'boolean' ? options.spellcheck : undefined,
        )}
        {...optional('defaultValue', options.value as string | undefined)}
        aria-describedby={describedBy(`${id}-info`, hintId, errorId)}
        error={Boolean(error)}
        className={className(options)}
        {...attributes(options.attributes)}
      />
      <CharacterCount.Message id={`${id}-info`} className={className(countMessage)}>
        {limit ? description.replaceAll('%{count}', String(limit)) : null}
      </CharacterCount.Message>
      {content(group.afterInput as Options | undefined)}
    </CharacterCount.Root>
  );
}
