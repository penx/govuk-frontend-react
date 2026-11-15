import { CharacterCount } from '../../src';
import type { Translation } from '../../src/utils/i18n';
import { optional, widthAndClassName } from '../nunjucks/helpers';
import { fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps, spellCheck, labelExpressible } from './field';

const translations = [
  'charactersUnderLimitText',
  'charactersAtLimitText',
  'charactersOverLimitText',
  'wordsUnderLimitText',
  'wordsAtLimitText',
  'wordsOverLimitText',
];

export default {
  supports: [
    ...fieldSupports,
    'rows',
    'value',
    'spellcheck',
    'maxlength',
    'maxwords',
    'threshold',
    'countType',
    'textareaDescriptionText',
    ...translations,
  ],
  render: (options) =>
    !labelExpressible(options) ? null : (
      <CharacterCount.Field
        {...fieldProps(options)}
        {...widthAndClassName(options)}
        {...optional('rows', options.rows as number)}
        {...optional('defaultValue', options.value as string)}
        {...spellCheck(options)}
        {...optional('maxLength', options.maxlength as number)}
        {...optional('maxWords', options.maxwords as number)}
        {...optional('threshold', options.threshold as number)}
        {...optional('countType', options.countType as 'words')}
        {...optional('textareaDescriptionText', options.textareaDescriptionText as string)}
        {...Object.fromEntries(
          translations.flatMap((key) =>
            options[key] === undefined ? [] : [[key, options[key] as Translation]],
          ),
        )}
      />
    ),
} satisfies CompositeMapping;
