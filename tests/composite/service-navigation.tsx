import { ServiceNavigation } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'serviceName',
    'serviceUrl',
    'ariaLabel',
    'navigationLabel',
    'menuButtonText',
    'collapseNavigationOnMobile',
    'classes',
    'attributes',
    ...['text', 'html', 'href', 'active', 'current'].map((key) => `navigation.*.${key}`),
  ],
  render: (options) => {
    const items = ((options.navigation as (Options | null)[] | undefined) ?? []).filter(
      Boolean,
    ) as Options[];
    return (
      <ServiceNavigation.Composite
        serviceName={options.serviceName as string | undefined}
        {...optional('serviceHref', options.serviceUrl as string)}
        {...optional('aria-label', options.serviceName ? (options.ariaLabel as string) : undefined)}
        {...optional('navigationLabel', (options.navigationLabel as string) || undefined)}
        {...optional('menuButtonText', (options.menuButtonText as string) || undefined)}
        {...optional('collapseNavigationOnMobile', options.collapseNavigationOnMobile as boolean)}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {items.map((item, index) => (
          <ServiceNavigation.ItemComposite
            key={index}
            {...optional('href', item.href as string)}
            active={Boolean(item.active)}
            current={Boolean(item.current)}
          >
            {content(item)}
          </ServiceNavigation.ItemComposite>
        ))}
      </ServiceNavigation.Composite>
    );
  },
} satisfies CompositeMapping;
