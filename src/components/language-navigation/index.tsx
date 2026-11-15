import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

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
