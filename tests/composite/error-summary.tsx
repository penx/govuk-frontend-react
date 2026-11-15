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
    >
      {((options.errorList as Options[] | undefined) ?? []).map((item, index) => (
        <ErrorSummary.ListItemComposite key={index} {...optional('href', item.href as string)}>
          {item.html ? html(item.html) : (item.text as string)}
        </ErrorSummary.ListItemComposite>
      ))}
    </ErrorSummary.Composite>
  ),
} satisfies CompositeMapping;
