import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { isSet, joinIds, type LabelFieldProps } from '../../utils/field';
import { i18nAttributes, type Translation } from '../../utils/i18n';
import { FormGroup, type FormGroupProps } from '../../objects/form-group';
import { ErrorMessageComposite } from '../error-message';
import { Hint, type HintProps } from '../hint';
import { LabelComposite } from '../label';
import { Control, type ControlProps } from '../textarea';

export type RootProps = FormGroupProps & {
  maxLength?: number;
  maxWords?: number;
  threshold?: number;
  countType?: 'characters' | 'words' | 'length';
  textareaDescriptionText?: string;
  charactersUnderLimitText?: Translation;
  charactersAtLimitText?: string;
  charactersOverLimitText?: Translation;
  wordsUnderLimitText?: Translation;
  wordsAtLimitText?: string;
  wordsOverLimitText?: Translation;
};

export function Root({
  maxLength,
  maxWords,
  threshold,
  countType = maxWords ? 'words' : undefined,
  textareaDescriptionText,
  charactersUnderLimitText,
  charactersAtLimitText,
  charactersOverLimitText,
  wordsUnderLimitText,
  wordsAtLimitText,
  wordsOverLimitText,
  className,
  ...props
}: RootProps) {
  const hasNoLimit = !maxLength && !maxWords;
  return (
    <FormGroup
      className={clsx('govuk-character-count', className)}
      data-module="govuk-character-count"
      data-maxlength={maxLength}
      data-maxwords={maxWords}
      data-threshold={threshold}
      data-count-type={countType}
      {...i18nAttributes(
        'textarea-description',
        hasNoLimit && textareaDescriptionText ? { other: textareaDescriptionText } : undefined,
      )}
      {...i18nAttributes('characters-under-limit', charactersUnderLimitText)}
      {...i18nAttributes('characters-at-limit', charactersAtLimitText)}
      {...i18nAttributes('characters-over-limit', charactersOverLimitText)}
      {...i18nAttributes('words-under-limit', wordsUnderLimitText)}
      {...i18nAttributes('words-at-limit', wordsAtLimitText)}
      {...i18nAttributes('words-over-limit', wordsOverLimitText)}
      {...props}
    />
  );
}

export type TextareaProps = ControlProps;

export function Textarea({ className, ...props }: TextareaProps) {
  return <Control className={clsx('govuk-js-character-count', className)} {...props} />;
}

export type MessageProps = HintProps;

export function Message({ className, ...props }: MessageProps) {
  return <Hint className={clsx('govuk-character-count__message', className)} {...props} />;
}

export type FieldProps = LabelFieldProps &
  Omit<TextareaProps, 'error' | 'maxLength'> &
  Omit<RootProps, keyof FormGroupProps> & {
    label?: ReactNode;
    hint?: ReactNode;
    errorMessage?: ReactNode;
  };

export function Field({
  id: idProp,
  name,
  label,
  labelSize,
  labelIsPageHeading,
  hint,
  errorMessage,
  maxLength,
  maxWords,
  threshold,
  countType,
  textareaDescriptionText,
  charactersUnderLimitText,
  charactersAtLimitText,
  charactersOverLimitText,
  wordsUnderLimitText,
  wordsAtLimitText,
  wordsOverLimitText,
  'aria-describedby': describedBy,
  ...props
}: FieldProps) {
  const id = idProp || name;
  const infoId = `${id}-info`;
  const hintId = isSet(hint) ? `${id}-hint` : undefined;
  const errorId = isSet(errorMessage) ? `${id}-error` : undefined;
  const limit = maxWords || maxLength;
  const words = (countType ?? (maxWords ? 'words' : undefined)) === 'words';

  return (
    <Root
      error={Boolean(errorId)}
      maxLength={maxLength}
      maxWords={maxWords}
      threshold={threshold}
      countType={countType}
      textareaDescriptionText={textareaDescriptionText}
      charactersUnderLimitText={charactersUnderLimitText}
      charactersAtLimitText={charactersAtLimitText}
      charactersOverLimitText={charactersOverLimitText}
      wordsUnderLimitText={wordsUnderLimitText}
      wordsAtLimitText={wordsAtLimitText}
      wordsOverLimitText={wordsOverLimitText}
    >
      <LabelComposite htmlFor={id} size={labelSize} isPageHeading={labelIsPageHeading}>
        {label}
      </LabelComposite>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {errorId && <ErrorMessageComposite id={errorId}>{errorMessage}</ErrorMessageComposite>}
      <Textarea
        id={id}
        name={name}
        error={Boolean(errorId)}
        aria-describedby={joinIds(describedBy, infoId, hintId, errorId)}
        {...props}
      />
      <Message id={infoId}>
        {limit
          ? (
              textareaDescriptionText ||
              `You can enter up to %{count} ${words ? 'words' : 'characters'}`
            ).replaceAll('%{count}', String(limit))
          : null}
      </Message>
    </Root>
  );
}
