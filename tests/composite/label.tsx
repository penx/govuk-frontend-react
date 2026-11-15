import { LabelComposite } from '../../src';
import { attributes, className, content, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['text', 'html', 'for', 'isPageHeading', 'classes', 'attributes'],
  render: (options) => (
    <LabelComposite
      {...optional('htmlFor', options.for as string)}
      isPageHeading={Boolean(options.isPageHeading)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </LabelComposite>
  ),
} satisfies CompositeMapping;
