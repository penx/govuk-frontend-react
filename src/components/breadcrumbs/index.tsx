import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'nav'> & {
  collapseOnMobile?: boolean;
};

export function Root({
  className,
  collapseOnMobile,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: RootProps) {
  return (
    <nav
      className={clsx(
        'govuk-breadcrumbs',
        className,
        collapseOnMobile && 'govuk-breadcrumbs--collapse-on-mobile',
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
