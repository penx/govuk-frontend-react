import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { Slot } from '../../utils/slot';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-tabs', className)} data-module="govuk-tabs" {...props} />;
}

export type TitleProps = ComponentProps<'h2'>;

export function Title({ className, children, ...props }: TitleProps) {
  return (
    <h2 className={clsx('govuk-tabs__title', className)} {...props}>
      {hasContent(children) ? children : 'Contents'}
    </h2>
  );
}

export type ListProps = ComponentProps<'ul'>;

export function List({ className, ...props }: ListProps) {
  return <ul className={clsx('govuk-tabs__list', className)} {...props} />;
}

export type ListItemProps = ComponentProps<'li'> & { selected?: boolean };

export function ListItem({ selected, className, ...props }: ListItemProps) {
  return (
    <li
      className={clsx(
        'govuk-tabs__list-item',
        selected && 'govuk-tabs__list-item--selected',
        className,
      )}
      {...props}
    />
  );
}

export type TabProps = ComponentProps<'a'> & {
  /** Render the only child (such as a router's link or a label) instead of an `a`, with the tab class merged onto it. */
  asChild?: boolean;
};

export function Tab({ className, asChild, children, ...props }: TabProps) {
  const Element = asChild ? Slot : 'a';
  return (
    <Element className={clsx('govuk-tabs__tab', className)} {...props}>
      {children}
    </Element>
  );
}

export type PanelProps = ComponentProps<'div'> & { selected?: boolean };

export function Panel({ selected, className, ...props }: PanelProps) {
  return (
    <div
      className={clsx('govuk-tabs__panel', !selected && 'govuk-tabs__panel--hidden', className)}
      {...props}
    />
  );
}
