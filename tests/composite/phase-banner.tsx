import { PhaseBanner } from '../../src';
import { attributes, className, content, type Options } from '../nunjucks/helpers';
import { contentOf, type CompositeMapping } from './helpers';

export default {
  supports: ['text', 'html', 'classes', 'attributes', ...contentOf('tag')],
  render: (options) => (
    <PhaseBanner.Composite
      tag={content(options.tag as Options | undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </PhaseBanner.Composite>
  ),
} satisfies CompositeMapping;
