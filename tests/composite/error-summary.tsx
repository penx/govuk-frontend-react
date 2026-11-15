import { ErrorSummary } from '../../src';
import { attributes, className, html, optional, type Options } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'titleText',
    'titleHtml',
    'descriptionText',
    'descriptionHtml',
    'disableAutoFocus',
    'classes',
    'attributes',
    'errorList.*.text',
    'errorList.*.html',
    'errorList.*.href',
  ],
  render: (options) => (
    <ErrorSummary.Composite
      title={options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
      description={
        options.descriptionHtml
          ? html(options.descriptionHtml)
          : (options.descriptionText as string | undefined)
      }
      {...optional('disableAutoFocus', options.disableAutoFocus as boolean)}
      className={className(options)}
      {...attributes(options.attributes)}
      errors={((options.errorList as Options[] | undefined) ?? []).map((item) => ({
        ...optional('href', item.href as string),
        children: item.html ? html(item.html) : (item.text as string),
      }))}
    />
  ),
} satisfies CompositeMapping;
