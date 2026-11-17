import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'table'> & {
  smallTextUntilTablet?: boolean;
};

/**
 * Use the table component to make information easier to compare and scan for users.
 *
 * @see https://design-system.service.gov.uk/components/table/
 */
export function Root({ className, smallTextUntilTablet, ...props }: RootProps) {
  return (
    <table
      className={clsx(
        'govuk-table',
        smallTextUntilTablet && 'govuk-table--small-text-until-tablet',
        className,
      )}
      {...props}
    />
  );
}

export type CaptionProps = ComponentProps<'caption'> & {
  size?: 'm' | 'l' | 'xl';
};

export function Caption({ className, size, ...props }: CaptionProps) {
  return (
    <caption
      className={clsx('govuk-table__caption', size && `govuk-table__caption--${size}`, className)}
      {...props}
    />
  );
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
  numeric?: boolean;
};

export function Header({ className, numeric, ...props }: HeaderProps) {
  return (
    <th
      className={clsx('govuk-table__header', numeric && 'govuk-table__header--numeric', className)}
      {...props}
    />
  );
}

export function ColumnHeader(props: HeaderProps) {
  return <Header scope="col" {...props} />;
}

export function RowHeader(props: HeaderProps) {
  return <Header scope="row" {...props} />;
}

export type CellProps = ComponentProps<'td'> & {
  numeric?: boolean;
};

export function Cell({ className, numeric, ...props }: CellProps) {
  return (
    <td
      className={clsx('govuk-table__cell', numeric && 'govuk-table__cell--numeric', className)}
      {...props}
    />
  );
}

export type CompositeProps = RootProps & {
  /** Caption text. */
  caption?: ReactNode;
  captionSize?: CaptionProps['size'];
  /** Can be used to add a row of table header cells (`<th>`) at the top of the table component. */
  head?: ReactNode;
};

/**
 * Use the table component to make information easier to compare and scan for users.
 *
 * Children are the body rows.
 *
 * @see https://design-system.service.gov.uk/components/table/
 */
export function Composite({ caption, captionSize, head, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      {hasContent(caption) && <Caption size={captionSize}>{caption}</Caption>}
      {hasContent(head) && (
        <Head>
          <Row>{head}</Row>
        </Head>
      )}
      <Body>{children}</Body>
    </Root>
  );
}
