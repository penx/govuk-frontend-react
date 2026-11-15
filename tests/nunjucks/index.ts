import type { ReactElement } from 'react';
import type { Options } from './helpers';
import backLink from './back-link';
import button from './button';
import errorMessage from './error-message';
import fieldset from './fieldset';
import hint from './hint';
import input from './input';
import insetText from './inset-text';
import label from './label';
import select from './select';
import textarea from './textarea';
import warningText from './warning-text';

export const mappings: Record<string, (options: Options) => ReactElement> = {
  'back-link': backLink,
  button,
  'error-message': errorMessage,
  fieldset,
  hint,
  input,
  'inset-text': insetText,
  label,
  select,
  textarea,
  'warning-text': warningText,
};
