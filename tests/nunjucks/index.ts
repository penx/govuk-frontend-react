import type { ReactElement } from 'react';
import type { Options } from './helpers';
import backLink from './back-link';
import breadcrumbs from './breadcrumbs';
import button from './button';
import details from './details';
import errorMessage from './error-message';
import fieldset from './fieldset';
import footer from './footer';
import hint from './hint';
import input from './input';
import insetText from './inset-text';
import label from './label';
import panel from './panel';
import phaseBanner from './phase-banner';
import select from './select';
import summaryList from './summary-list';
import table from './table';
import tag from './tag';
import textarea from './textarea';
import warningText from './warning-text';

export const mappings: Record<string, (options: Options) => ReactElement> = {
  'back-link': backLink,
  breadcrumbs,
  button,
  details,
  'error-message': errorMessage,
  fieldset,
  footer,
  hint,
  input,
  'inset-text': insetText,
  label,
  panel,
  'phase-banner': phaseBanner,
  select,
  'summary-list': summaryList,
  table,
  tag,
  textarea,
  'warning-text': warningText,
};
