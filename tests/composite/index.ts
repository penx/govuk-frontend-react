import type { CompositeMapping } from './helpers';
import characterCount from './character-count';
import checkboxes from './checkboxes';
import dateInput from './date-input';
import fileUpload from './file-upload';
import input from './input';
import passwordInput from './password-input';
import radios from './radios';
import select from './select';
import textarea from './textarea';

export const compositeMappings: Record<string, CompositeMapping> = {
  'character-count': characterCount,
  checkboxes,
  'date-input': dateInput,
  'file-upload': fileUpload,
  input,
  'password-input': passwordInput,
  radios,
  select,
  textarea,
};
