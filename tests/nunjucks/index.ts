import type { ReactElement } from 'react';
import type { Options } from './helpers';
import button from './button';
import errorMessage from './error-message';
import fieldset from './fieldset';
import hint from './hint';
import label from './label';

export const mappings: Record<string, (options: Options) => ReactElement> = {
  button,
  'error-message': errorMessage,
  fieldset,
  hint,
  label,
};
