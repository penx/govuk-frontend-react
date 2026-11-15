import { LanguageNavigation } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'classes',
    'attributes',
    'ariaLabel',
    ...[
      'text',
      'html',
      'href',
      'lang',
      'hrefLang',
      'dir',
      'current',
      'languageDescriptionText',
    ].map((key) => `items.*.${key}`),
  ],
  render: (options) => (
    <LanguageNavigation.Composite
      {...optional('aria-label', options.ariaLabel as string)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {((options.items as Options[] | undefined) ?? []).map((item, index) => (
        <LanguageNavigation.ItemComposite
          key={index}
          {...optional('href', item.href as string)}
          {...optional('lang', item.lang as string)}
          {...optional('hrefLang', (item.hrefLang as string) || undefined)}
          {...optional('dir', item.dir as string)}
          current={Boolean(item.current)}
          languageDescription={item.languageDescriptionText as string | undefined}
        >
          {content(item)}
        </LanguageNavigation.ItemComposite>
      ))}
    </LanguageNavigation.Composite>
  ),
} satisfies CompositeMapping;
