import type { CompositeMapping } from './helpers';
import accordion from './accordion';
import breadcrumbs from './breadcrumbs';
import button from './button';
import characterCount from './character-count';
import checkboxes from './checkboxes';
import cookieBanner from './cookie-banner';
import dateInput from './date-input';
import details from './details';
import errorMessage from './error-message';
import errorSummary from './error-summary';
import exitThisPage from './exit-this-page';
import feedback from './feedback';
import fieldset from './fieldset';
import fileUpload from './file-upload';
import footer from './footer';
import genericHeader from './generic-header';
import header from './header';
import input from './input';
import label from './label';
import languageNavigation from './language-navigation';
import notificationBanner from './notification-banner';
import pagination from './pagination';
import panel from './panel';
import passwordInput from './password-input';
import phaseBanner from './phase-banner';
import radios from './radios';
import select from './select';
import serviceNavigation from './service-navigation';
import summaryList from './summary-list';
import table from './table';
import taskList from './task-list';
import textarea from './textarea';
import warningText from './warning-text';

export const compositeMappings: Record<string, CompositeMapping> = {
  accordion,
  breadcrumbs,
  button,
  'character-count': characterCount,
  checkboxes,
  'cookie-banner': cookieBanner,
  'date-input': dateInput,
  details,
  'error-message': errorMessage,
  'error-summary': errorSummary,
  'exit-this-page': exitThisPage,
  feedback,
  fieldset,
  'file-upload': fileUpload,
  footer,
  'generic-header': genericHeader,
  header,
  input,
  label,
  'language-navigation': languageNavigation,
  'notification-banner': notificationBanner,
  pagination,
  panel,
  'password-input': passwordInput,
  'phase-banner': phaseBanner,
  radios,
  select,
  'service-navigation': serviceNavigation,
  'summary-list': summaryList,
  table,
  'task-list': taskList,
  textarea,
  'warning-text': warningText,
};
