import { Details } from '../../src';
import { attributes, className, content, html, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['id', 'open', 'summaryText', 'summaryHtml', 'text', 'html', 'classes', 'attributes'],
  render: (options) => (
    <Details.Composite
      {...optional('id', options.id as string)}
      open={Boolean(options.open)}
      summary={options.summaryHtml ? html(options.summaryHtml) : (options.summaryText as string)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </Details.Composite>
  ),
} satisfies CompositeMapping;
