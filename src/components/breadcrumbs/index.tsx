import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Slot } from '../../utils/slot';

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

export type LinkProps = ComponentProps<'a'> & {
  /** Render the only child (such as a router's link) instead of an `a`, with the link class merged onto it. */
  asChild?: boolean;
};

export function Link({ className, asChild, children, ...props }: LinkProps) {
  const Element = asChild ? Slot : 'a';
  return (
    <Element className={clsx('govuk-breadcrumbs__link', className)} {...props}>
      {children}
    </Element>
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

export type CompositeProps = Omit<RootProps, 'children'> &
  (
    | { children?: ReactNode; items?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        items: ItemCompositeProps[];
      }
  );

/** Children are `ItemComposite`s. */
export function Composite({ items, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <List>
        {items ? items.map((item, index) => <ItemComposite key={index} {...item} />) : children}
      </List>
    </Root>
  );
}
