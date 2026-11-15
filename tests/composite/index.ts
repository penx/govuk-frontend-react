import type { CompositeMapping } from './helpers';
import breadcrumbs from './breadcrumbs';
import button from './button';
import characterCount from './character-count';
import checkboxes from './checkboxes';
import dateInput from './date-input';
import details from './details';
import errorMessage from './error-message';
import exitThisPage from './exit-this-page';
import fieldset from './fieldset';
import fileUpload from './file-upload';
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
import taskList from './task-list';
import textarea from './textarea';
import warningText from './warning-text';

export const compositeMappings: Record<string, CompositeMapping> = {
  breadcrumbs,
  button,
  'character-count': characterCount,
  checkboxes,
  'date-input': dateInput,
  details,
  'error-message': errorMessage,
  'exit-this-page': exitThisPage,
  fieldset,
  'file-upload': fileUpload,
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
  'task-list': taskList,
  textarea,
  'warning-text': warningText,
};
