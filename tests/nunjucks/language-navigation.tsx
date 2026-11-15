import { LanguageNavigation, VisuallyHidden } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

type Item = Options & {
  href?: string;
  current?: boolean;
  lang?: string;
  hrefLang?: string;
  dir?: string;
  languageDescriptionText?: string;
};

export default function languageNavigation(options: Options) {
  const items = (options.items as Item[] | undefined) ?? [];
  return (
    <LanguageNavigation.Root
      className={className(options)}
      {...attributes(options.attributes)}
      {...optional('aria-label', options.ariaLabel as string | undefined)}
    >
      <LanguageNavigation.List>
        {items.map((item, index) => {
          const shared = {
            className: className(item),
            ...optional('lang', item.lang),
            ...optional('dir', item.dir),
            ...attributes(item.attributes),
          };
          return (
            <LanguageNavigation.ListItem key={index}>
              {item.current || !item.href ? (
                <LanguageNavigation.Text {...shared}>{content(item)}</LanguageNavigation.Text>
              ) : (
                <LanguageNavigation.Link
                  href={item.href}
                  {...optional('hrefLang', item.hrefLang || undefined)}
                  {...shared}
                >
                  {content(item)}
                  {item.languageDescriptionText ? (
                    <VisuallyHidden> {item.languageDescriptionText}</VisuallyHidden>
                  ) : null}
                </LanguageNavigation.Link>
              )}
            </LanguageNavigation.ListItem>
          );
        })}
      </LanguageNavigation.List>
    </LanguageNavigation.Root>
  );
}
