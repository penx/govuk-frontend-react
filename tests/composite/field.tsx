import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';

export const sub = (o: unknown) => content(o as Options | undefined);

/** Field props for the options in `fieldSupports`. */
export function fieldProps(options: Options) {
  return {
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
