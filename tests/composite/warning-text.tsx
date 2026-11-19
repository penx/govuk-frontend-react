import { WarningText } from '../../src';
import { attributes, className, content, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['text', 'html', 'iconFallbackText', 'classes', 'attributes'],
  render: (options) => (
    <WarningText
      {...optional('iconFallbackText', options.iconFallbackText as string)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </WarningText>
  ),
} satisfies CompositeMapping;
