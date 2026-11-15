import type { ReactElement } from 'react';
import type { Options } from './helpers';
import backLink from './back-link';
import breadcrumbs from './breadcrumbs';
import button from './button';
import details from './details';
import errorMessage from './error-message';
import errorSummary from './error-summary';
import fieldset from './fieldset';
import footer from './footer';
import genericHeader from './generic-header';
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
  'error-summary': errorSummary,
  fieldset,
  footer,
  'generic-header': genericHeader,
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
