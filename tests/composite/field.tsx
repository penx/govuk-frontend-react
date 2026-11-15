import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import { sizeFromClasses } from './helpers';

export const sub = (o: unknown) => content(o as Options | undefined);

const labelOf = (options: Options) => (options.label ?? {}) as Options;

/** Whether the label's classes are only a size the Field can set. */
export const labelExpressible = (options: Options) =>
  sizeFromClasses(labelOf(options).classes, 'govuk-label') !== false;

/** Field props for the options in `fieldSupports`. */
export function fieldProps(options: Options) {
  const label = labelOf(options);
  return {
    ...optional('labelSize', sizeFromClasses(label.classes, 'govuk-label') || undefined),
    ...optional('labelIsPageHeading', (label.isPageHeading as boolean) || undefined),
    ...optional('id', (options.id as string) || undefined),
    ...optional('name', options.name as string),
    ...optional('disabled', (options.disabled as boolean) || undefined),
    ...optional('aria-describedby', (options.describedBy as string) || undefined),
    className: className(options),
    label: sub(options.label),
    hint: sub(options.hint),
    errorMessage: sub(options.errorMessage),
    ...attributes(options.attributes),
  };
}

export const spellCheck = (options: Options) =>
  optional('spellCheck', typeof options.spellcheck === 'boolean' ? options.spellcheck : undefined);
