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
  /** The maximum number of characters (or words if `countType` is set to `"words"`). */
  maxLength?: number;
  /** The maximum number of words. Replaced by the `maxLength` and `countType: "words"` options. */
  maxWords?: number;
  /** The percentage value of the limit at which point the count message is displayed. If this attribute is set, the count message will be hidden by default. */
  threshold?: number;
  /** The count type used to count the text – `"length"` or `"words"`. Defaults to `"length"`. */
  countType?: 'characters' | 'words' | 'length';
  /** Message made available to assistive technologies to describe that the component accepts only a limited amount of content. It is visible on the page if `countType` is not supported or JavaScript is unavailable. The component will replace the `%{count}` placeholder with the value of the `maxLength` parameter. */
  textareaDescriptionText?: string;
  /** Message displayed when the number of characters is under the configured maximum, `maxLength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining characters. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). */
  charactersUnderLimitText?: Translation;
  /** Message displayed when the number of characters reaches the configured maximum, `maxLength`. This message is displayed visually and through assistive technologies. */
  charactersAtLimitText?: string;
  /** Message displayed when the number of characters is over the configured maximum, `maxLength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). */
  charactersOverLimitText?: Translation;
  /** Message displayed when the number of words is under the configured maximum, `maxLength` with `countType: "words"`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining words. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). */
  wordsUnderLimitText?: Translation;
  /** Message displayed when the number of words reaches the configured maximum, `maxLength` with `countType: "words"`. This message is displayed visually and through assistive technologies. */
  wordsAtLimitText?: string;
  /** Message displayed when the number of words is over the configured maximum, `maxLength` with `countType: "words"`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of words above the maximum. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). */
  wordsOverLimitText?: Translation;
};

/**
 * Tell users how many characters or words they can enter into a textarea.
 *
 * @see https://design-system.service.gov.uk/components/character-count/
 */
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
    /** The label used by the character count component. */
    label?: ReactNode;
    /** Can be used to add a hint to the character count component. */
    hint?: ReactNode;
    /** Can be used to add an error message to the character count component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. */
    errorMessage?: ReactNode;
  };

/**
 * Tell users how many characters or words they can enter into a textarea.
 *
 * @see https://design-system.service.gov.uk/components/character-count/
 */
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
