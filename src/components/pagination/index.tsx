import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'nav'> & { block?: boolean };

export function Root({
  block,
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: RootProps) {
  return (
    <nav
      className={clsx('govuk-pagination', block && 'govuk-pagination--block', className)}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export type PreviousProps = ComponentProps<'div'>;

export function Previous({ className, ...props }: PreviousProps) {
  return <div className={clsx('govuk-pagination__prev', className)} {...props} />;
}

export type NextProps = ComponentProps<'div'>;

export function Next({ className, ...props }: NextProps) {
  return <div className={clsx('govuk-pagination__next', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a className={clsx('govuk-link', 'govuk-pagination__link', className)} {...props}>
      {children}
    </a>
  );
}

export function PreviousLink(props: LinkProps) {
  return <Link rel="prev" {...props} />;
}

export function NextLink(props: LinkProps) {
  return <Link rel="next" {...props} />;
}

export type IconProps = ComponentProps<'svg'>;

function Icon({ className, ...props }: IconProps) {
  return (
    <svg
      className={clsx('govuk-pagination__icon', className)}
      xmlns="http://www.w3.org/2000/svg"
      height="13"
      width="15"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 15 13"
      {...props}
    />
  );
}

export function PreviousIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={clsx('govuk-pagination__icon--prev', className)} {...props}>
      <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </Icon>
  );
}

export function NextIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={clsx('govuk-pagination__icon--next', className)} {...props}>
      <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </Icon>
  );
}

export type LinkTitleProps = ComponentProps<'span'> & { decorated?: boolean };

export function LinkTitle({ decorated, className, ...props }: LinkTitleProps) {
  return (
    <span
      className={clsx(
        'govuk-pagination__link-title',
        decorated && 'govuk-pagination__link-title--decorated',
        className,
      )}
      {...props}
    />
  );
}

export function PreviousLinkTitle({ children, ...props }: LinkTitleProps) {
  return (
    <LinkTitle {...props}>
      {hasContent(children) ? (
        children
      ) : (
        <>
          Previous<span className="govuk-visually-hidden"> page</span>
        </>
      )}
    </LinkTitle>
  );
}

export function NextLinkTitle({ children, ...props }: LinkTitleProps) {
  return (
    <LinkTitle {...props}>
      {hasContent(children) ? (
        children
      ) : (
        <>
          Next<span className="govuk-visually-hidden"> page</span>
        </>
      )}
    </LinkTitle>
  );
}

export type LinkLabelProps = ComponentProps<'span'>;

export function LinkLabel({ className, ...props }: LinkLabelProps) {
  return <span className={clsx('govuk-pagination__link-label', className)} {...props} />;
}

export type ListProps = ComponentProps<'ul'>;

export function List({ className, ...props }: ListProps) {
  return <ul className={clsx('govuk-pagination__list', className)} {...props} />;
}

export type ItemProps = ComponentProps<'li'> & { current?: boolean; ellipsis?: boolean };

export function Item({ current, ellipsis, className, children, ...props }: ItemProps) {
  return (
    <li
      className={clsx(
        'govuk-pagination__item',
        current && 'govuk-pagination__item--current',
        ellipsis && 'govuk-pagination__item--ellipsis',
        className,
      )}
      {...props}
    >
      {ellipsis && !hasContent(children) ? '⋯' : children}
    </li>
  );
}

export function ItemLink({ children, ...props }: LinkProps) {
  return (
    <Link
      {...((typeof children === 'string' || typeof children === 'number') && {
        'aria-label': `Page ${children}`,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}
