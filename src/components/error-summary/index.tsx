import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'div'> & { disableAutoFocus?: boolean };

export function Root({ disableAutoFocus, className, children, ...props }: RootProps) {
  return (
    <div
      className={clsx('govuk-error-summary', className)}
      {...(disableAutoFocus !== undefined && {
        'data-disable-auto-focus': String(disableAutoFocus),
      })}
      data-module="govuk-error-summary"
      {...props}
    >
      <div role="alert">{children}</div>
    </div>
  );
}

export type TitleProps = ComponentProps<'h2'>;

export function Title({ className, children, ...props }: TitleProps) {
  return (
    <h2 className={clsx('govuk-error-summary__title', className)} {...props}>
      {children}
    </h2>
  );
}

export type BodyProps = ComponentProps<'div'>;

export function Body({ className, ...props }: BodyProps) {
  return <div className={clsx('govuk-error-summary__body', className)} {...props} />;
}

export type DescriptionProps = ComponentProps<'p'>;

export function Description(props: DescriptionProps) {
  return <p {...props} />;
}

export type ListProps = ComponentProps<'ul'>;

export function List({ className, ...props }: ListProps) {
  return <ul className={clsx('govuk-list', 'govuk-error-summary__list', className)} {...props} />;
}

export type ListItemProps = ComponentProps<'li'>;

export function ListItem(props: ListItemProps) {
  return <li {...props} />;
}
