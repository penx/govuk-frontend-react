import { Body, Feedback } from '../../src';
import { attributes, className, html, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['titleText', 'titleHtml', 'headingLevel', 'text', 'html', 'classes', 'attributes'],
  render: (options) => (
    <Feedback.Composite
      title={options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
      {...optional('headingLevel', (options.headingLevel as 2) || undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {options.html ? (
        html(options.html)
      ) : options.text ? (
        <Body>{String(options.text)}</Body>
      ) : undefined}
    </Feedback.Composite>
  ),
} satisfies CompositeMapping;
