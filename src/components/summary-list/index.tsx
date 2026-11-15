import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export * as Card from './card';

export type RootProps = ComponentProps<'dl'> & {
  noBorder?: boolean;
};

export function Root({ className, noBorder, ...props }: RootProps) {
  return (
    <dl
      className={clsx('govuk-summary-list', noBorder && 'govuk-summary-list--no-border', className)}
      {...props}
    />
  );
}

export type RowProps = ComponentProps<'div'> & {
  noActions?: boolean;
  noBorder?: boolean;
};

export function Row({ className, noActions, noBorder, ...props }: RowProps) {
  return (
    <div
      className={clsx(
        'govuk-summary-list__row',
        noActions && 'govuk-summary-list__row--no-actions',
        noBorder && 'govuk-summary-list__row--no-border',
        className,
      )}
      {...props}
    />
  );
}

export type KeyProps = ComponentProps<'dt'>;

export function Key({ className, ...props }: KeyProps) {
  return <dt className={clsx('govuk-summary-list__key', className)} {...props} />;
}

export type ValueProps = ComponentProps<'dd'>;

export function Value({ className, ...props }: ValueProps) {
  return <dd className={clsx('govuk-summary-list__value', className)} {...props} />;
}

export type ActionsProps = ComponentProps<'dd'>;

export function Actions({ className, ...props }: ActionsProps) {
  return <dd className={clsx('govuk-summary-list__actions', className)} {...props} />;
}

export type ActionsListProps = ComponentProps<'ul'>;

export function ActionsList({ className, ...props }: ActionsListProps) {
  return <ul className={clsx('govuk-summary-list__actions-list', className)} {...props} />;
}

export type ActionsListItemProps = ComponentProps<'li'>;

export function ActionsListItem({ className, ...props }: ActionsListItemProps) {
  return <li className={clsx('govuk-summary-list__actions-list-item', className)} {...props} />;
}

export type ActionProps = ComponentProps<'a'> & {
  visuallyHiddenText?: ReactNode;
};

export function Action({ className, visuallyHiddenText, children, ...props }: ActionProps) {
  return (
    <a className={clsx('govuk-link', className)} {...props}>
      {children}
      {hasContent(visuallyHiddenText) && (
        <span className="govuk-visually-hidden"> {visuallyHiddenText}</span>
      )}
    </a>
  );
}
