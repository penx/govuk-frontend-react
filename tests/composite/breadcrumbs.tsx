import { Breadcrumbs } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'classes',
    'collapseOnMobile',
    'labelText',
    'attributes',
    'items.*.text',
    'items.*.html',
    'items.*.href',
  ],
  render: (options) => (
    <Breadcrumbs.Composite
      collapseOnMobile={Boolean(options.collapseOnMobile)}
      {...optional('aria-label', options.labelText as string)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {((options.items as Options[] | undefined) ?? []).map((item, index) => (
        <Breadcrumbs.ItemComposite key={index} {...optional('href', item.href as string)}>
          {content(item)}
        </Breadcrumbs.ItemComposite>
      ))}
    </Breadcrumbs.Composite>
  ),
} satisfies CompositeMapping;
