import type { ReactElement } from 'react';
import type { Options } from './helpers';
import accordion from './accordion';
import backLink from './back-link';
import breadcrumbs from './breadcrumbs';
import button from './button';
import characterCount from './character-count';
import checkboxes from './checkboxes';
import cookieBanner from './cookie-banner';
import dateInput from './date-input';
import details from './details';
import errorMessage from './error-message';
import errorSummary from './error-summary';
import feedback from './feedback';
import fieldset from './fieldset';
import fileUpload from './file-upload';
import footer from './footer';
import genericHeader from './generic-header';
import header from './header';
import hint from './hint';
import input from './input';
import insetText from './inset-text';
import label from './label';
import languageNavigation from './language-navigation';
import notificationBanner from './notification-banner';
import pagination from './pagination';
import panel from './panel';
import passwordInput from './password-input';
import phaseBanner from './phase-banner';
import radios from './radios';
import select from './select';
import skipLink from './skip-link';
import summaryList from './summary-list';
import table from './table';
import tabs from './tabs';
import tag from './tag';
import taskList from './task-list';
import textarea from './textarea';
import warningText from './warning-text';

export const mappings: Record<string, (options: Options) => ReactElement> = {
  accordion,
  'back-link': backLink,
  breadcrumbs,
  button,
  'character-count': characterCount,
  checkboxes,
  'cookie-banner': cookieBanner,
  'date-input': dateInput,
  details,
  'error-message': errorMessage,
  'error-summary': errorSummary,
  feedback,
  fieldset,
  'file-upload': fileUpload,
  footer,
  'generic-header': genericHeader,
  header,
  hint,
  input,
  'inset-text': insetText,
  label,
  'language-navigation': languageNavigation,
  'notification-banner': notificationBanner,
  pagination,
  panel,
  'password-input': passwordInput,
  'phase-banner': phaseBanner,
  radios,
  select,
  'skip-link': skipLink,
  'summary-list': summaryList,
  table,
  tabs,
  tag,
  'task-list': taskList,
  textarea,
  'warning-text': warningText,
};
