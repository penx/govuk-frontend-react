import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'ul'>;

export function Root({ className, ...props }: RootProps) {
  return <ul className={clsx('govuk-task-list', className)} {...props} />;
}

export type ItemProps = ComponentProps<'li'> & { withLink?: boolean };

export function Item({ withLink, className, ...props }: ItemProps) {
  return (
    <li
      className={clsx(
        'govuk-task-list__item',
        withLink && 'govuk-task-list__item--with-link',
        className,
      )}
      {...props}
    />
  );
}

export type NameAndHintProps = ComponentProps<'div'>;

export function NameAndHint({ className, ...props }: NameAndHintProps) {
  return <div className={clsx('govuk-task-list__name-and-hint', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a className={clsx('govuk-link', 'govuk-task-list__link', className)} {...props}>
      {children}
    </a>
  );
}

export type HintProps = ComponentProps<'div'>;

export function Hint({ className, ...props }: HintProps) {
  return <div className={clsx('govuk-task-list__hint', className)} {...props} />;
}

export type StatusProps = ComponentProps<'div'> & { cannotStartYet?: boolean };

export function Status({ cannotStartYet, className, ...props }: StatusProps) {
  return (
    <div
      className={clsx(
        'govuk-task-list__status',
        cannotStartYet && 'govuk-task-list__status--cannot-start-yet',
        className,
      )}
      {...props}
    />
  );
}
