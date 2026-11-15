import { ErrorMessageComposite } from '../../src';
import { attributes, className, content, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: ['id', 'text', 'html', 'visuallyHiddenText', 'classes', 'attributes'],
  render: (options) => (
    <ErrorMessageComposite
      {...optional('id', options.id as string)}
      {...optional('visuallyHiddenText', options.visuallyHiddenText as string | false)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </ErrorMessageComposite>
  ),
} satisfies CompositeMapping;
