import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type RootProps = ComponentProps<'nav'> & { inverse?: boolean };

/**
 * The Language navigation component helps users choose and switch between languages when using a service.
 *
 * @see https://design-system.service.gov.uk/components/language-navigation/
 */
export function Root({
  inverse,
  className,
  'aria-label': ariaLabel = 'Language',
  ...props
}: RootProps) {
  return (
    <nav
      className={clsx(
        'govuk-language-navigation',
        inverse && 'govuk-language-navigation--inverse',
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export type ListProps = ComponentProps<'ul'>;

export function List({ className, ...props }: ListProps) {
  return <ul className={clsx('govuk-language-navigation__list', className)} {...props} />;
}

export type ListItemProps = ComponentProps<'li'>;

export function ListItem({ className, ...props }: ListItemProps) {
  return <li className={clsx('govuk-language-navigation__list-item', className)} {...props} />;
}

export type TextProps = ComponentProps<'span'>;

export function Text({ className, ...props }: TextProps) {
  return (
    <span
      className={clsx('govuk-language-navigation__text', className)}
      aria-current="true"
      {...props}
    />
  );
}

export type LinkProps = ComponentProps<'a'>;

export function Link({ lang, hrefLang, className, children, ...props }: LinkProps) {
  return (
    <a
      className={clsx('govuk-language-navigation__link', className)}
      rel="alternate"
      lang={lang}
      hrefLang={hrefLang ?? lang}
      {...props}
    >
      {children}
    </a>
  );
}

export type ItemCompositeProps = Omit<LinkProps, 'href'> & {
  /** Link to the current page in this language. */
  href?: string;
  /** Whether this is the language of the current page. Defaults to `true` when `href` is not provided. */
  current?: boolean;
  /** Visually hidden text after a language link to indicate what the link will do. Write it in the language of the link (for example, "Change the language to English"). */
  languageDescription?: ReactNode;
};

/** A link to the page in another language, or the current language when `current` or there's no `href`. */
export function ItemComposite({
  href,
  current,
  languageDescription,
  hrefLang,
  children,
  ...props
}: ItemCompositeProps) {
  return (
    <ListItem>
      {current || !href ? (
        <Text lang={props.lang} dir={props.dir} className={props.className}>
          {children}
        </Text>
      ) : (
        <Link href={href} hrefLang={hrefLang} {...props}>
          {children}
          {hasContent(languageDescription) && (
            <VisuallyHidden> {languageDescription}</VisuallyHidden>
          )}
        </Link>
      )}
    </ListItem>
  );
}

export type CompositeProps = Omit<RootProps, 'children'> &
  (
    | { children?: ReactNode; items?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        items: ItemCompositeProps[];
      }
  );

/**
 * The Language navigation component helps users choose and switch between languages when using a service.
 *
 * Children are `ItemComposite`s.
 *
 * @see https://design-system.service.gov.uk/components/language-navigation/
 */
export function Composite({ items, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <List>
        {items ? items.map((item, index) => <ItemComposite key={index} {...item} />) : children}
      </List>
    </Root>
  );
}
