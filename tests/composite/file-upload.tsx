import { FileUpload } from '../../src';
import type { Translation } from '../../src/utils/i18n';
import { optional } from '../nunjucks/helpers';
import { fieldSupports, type CompositeMapping } from './helpers';
import { fieldProps } from './field';

const texts = [
  'chooseFilesButtonText',
  'noFileChosenText',
  'multipleFilesChosenText',
  'dropInstructionText',
  'enteredDropZoneText',
  'leftDropZoneText',
];

export default {
  supports: [...fieldSupports, 'multiple', 'javascript', ...texts],
  render: (options) => (
    <FileUpload.Field
      {...fieldProps(options)}
      {...optional('multiple', (options.multiple as boolean) || undefined)}
      {...optional('javascript', (options.javascript as boolean) || undefined)}
      {...Object.assign({}, ...texts.map((key) => optional(key, options[key] as Translation)))}
    />
  ),
} satisfies CompositeMapping;
