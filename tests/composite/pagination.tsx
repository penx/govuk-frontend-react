import { Pagination } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

type Item = {
  number?: string | number;
  href?: string;
  current?: boolean;
  ellipsis?: boolean;
  visuallyHiddenText?: string;
};

const link = ['href', 'text', 'html', 'labelText'];

export default {
  supports: [
    'landmarkLabel',
    'classes',
    'attributes',
    ...['number', 'href', 'current', 'ellipsis', 'visuallyHiddenText'].map((k) => `items.*.${k}`),
    ...link.map((k) => `previous.${k}`),
    ...link.map((k) => `next.${k}`),
  ],
  render: (options) => {
    const items = options.items as (Item | null)[] | undefined;
    if (items && !items.some((item) => item && Object.keys(item).length)) return null;
    const previous = options.previous as Options | undefined;
    const next = options.next as Options | undefined;
    return (
      <Pagination.Composite
        {...optional('aria-label', (options.landmarkLabel as string) || undefined)}
        previousHref={previous?.href as string | undefined}
        previousText={content(previous)}
        previousLabel={previous?.labelText as string | undefined}
        nextHref={next?.href as string | undefined}
        nextText={content(next)}
        nextLabel={next?.labelText as string | undefined}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {items?.map((item, index) =>
          !item || !Object.keys(item).length ? null : item.ellipsis ? (
            <Pagination.Item key={index} ellipsis />
          ) : (
            <Pagination.ItemComposite
              key={index}
              number={item.number ?? ''}
              href={item.href}
              current={item.current}
              {...optional('aria-label', item.visuallyHiddenText)}
            />
          ),
        )}
      </Pagination.Composite>
    );
  },
} satisfies CompositeMapping;
