import type { ReactElement } from 'react';
import type { Options } from './helpers';
import backLink from './back-link';
import breadcrumbs from './breadcrumbs';
import button from './button';
import details from './details';
import errorMessage from './error-message';
import errorSummary from './error-summary';
import feedback from './feedback';
import fieldset from './fieldset';
import footer from './footer';
import genericHeader from './generic-header';
import hint from './hint';
import input from './input';
import insetText from './inset-text';
import label from './label';
import pagination from './pagination';
import panel from './panel';
import passwordInput from './password-input';
import phaseBanner from './phase-banner';
import select from './select';
import skipLink from './skip-link';
import summaryList from './summary-list';
import table from './table';
import tag from './tag';
import taskList from './task-list';
import textarea from './textarea';
import warningText from './warning-text';

export const mappings: Record<string, (options: Options) => ReactElement> = {
  'back-link': backLink,
  breadcrumbs,
  button,
  details,
  'error-message': errorMessage,
  'error-summary': errorSummary,
  feedback,
  fieldset,
  footer,
  'generic-header': genericHeader,
  hint,
  input,
  'inset-text': insetText,
  label,
  pagination,
  panel,
  'password-input': passwordInput,
  'phase-banner': phaseBanner,
  select,
  'skip-link': skipLink,
  'summary-list': summaryList,
  table,
  tag,
  'task-list': taskList,
  textarea,
  'warning-text': warningText,
};
