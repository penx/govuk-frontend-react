import type { ReactElement } from 'react';
import type { Options } from './helpers';
import backLink from './back-link';
import button from './button';
import errorMessage from './error-message';
import fieldset from './fieldset';
import hint from './hint';
import input from './input';
import label from './label';
import select from './select';
import textarea from './textarea';

export const mappings: Record<string, (options: Options) => ReactElement> = {
  'back-link': backLink,
  button,
  'error-message': errorMessage,
  fieldset,
  hint,
  input,
  label,
  select,
  textarea,
};
