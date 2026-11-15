import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'table'>;

export function Root({ className, ...props }: RootProps) {
  return <table className={clsx('govuk-table', className)} {...props} />;
}

export type CaptionProps = ComponentProps<'caption'>;

export function Caption({ className, ...props }: CaptionProps) {
  return <caption className={clsx('govuk-table__caption', className)} {...props} />;
}

export type HeadProps = ComponentProps<'thead'>;

export function Head({ className, ...props }: HeadProps) {
  return <thead className={clsx('govuk-table__head', className)} {...props} />;
}

export type BodyProps = ComponentProps<'tbody'>;

export function Body({ className, ...props }: BodyProps) {
  return <tbody className={clsx('govuk-table__body', className)} {...props} />;
}

export type RowProps = ComponentProps<'tr'>;

export function Row({ className, ...props }: RowProps) {
  return <tr className={clsx('govuk-table__row', className)} {...props} />;
}

export type HeaderProps = ComponentProps<'th'> & {
  format?: 'numeric';
};

export function Header({ className, format, ...props }: HeaderProps) {
  return (
    <th
      className={clsx('govuk-table__header', format && `govuk-table__header--${format}`, className)}
      {...props}
    />
  );
}

export type CellProps = ComponentProps<'td'> & {
  format?: 'numeric';
};

export function Cell({ className, format, ...props }: CellProps) {
  return (
    <td
      className={clsx('govuk-table__cell', format && `govuk-table__cell--${format}`, className)}
      {...props}
    />
  );
}
