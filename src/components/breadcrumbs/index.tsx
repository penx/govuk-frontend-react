import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'nav'> & {
  collapseOnMobile?: boolean;
  inverse?: boolean;
};

export function Root({
  className,
  collapseOnMobile,
  inverse,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: RootProps) {
  return (
    <nav
      className={clsx(
        'govuk-breadcrumbs',
        className,
        collapseOnMobile && 'govuk-breadcrumbs--collapse-on-mobile',
        inverse && 'govuk-breadcrumbs--inverse',
      )}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export type ListProps = ComponentProps<'ol'>;

export function List({ className, ...props }: ListProps) {
  return <ol className={clsx('govuk-breadcrumbs__list', className)} {...props} />;
}

export type ItemProps = ComponentProps<'li'>;

export function Item({ className, ...props }: ItemProps) {
  return <li className={clsx('govuk-breadcrumbs__list-item', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a className={clsx('govuk-breadcrumbs__link', className)} {...props}>
      {children}
    </a>
  );
}

export type ItemCompositeProps = ItemProps & { href?: string };

/** A link, or the current page when there's no `href`. */
export function ItemComposite({ href, children, ...props }: ItemCompositeProps) {
  return href ? (
    <Item {...props}>
      <Link href={href}>{children}</Link>
    </Item>
  ) : (
    <Item aria-current="page" {...props}>
      {children}
    </Item>
  );
}

export type CompositeProps = RootProps;

/** Children are `ItemComposite`s. */
export function Composite({ children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <List>{children}</List>
    </Root>
  );
}
