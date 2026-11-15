import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type RootProps = ComponentProps<'nav'> & { inverse?: boolean };

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
  href?: string;
  current?: boolean;
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
        <Text {...(props as TextProps)}>{children}</Text>
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

export function Composite({ children, ...props }: RootProps) {
  return (
    <Root {...props}>
      <List>{children}</List>
    </Root>
  );
}
