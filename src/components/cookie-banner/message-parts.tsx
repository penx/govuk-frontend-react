import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import {
  GridColumn as BaseGridColumn,
  type GridColumnProps as BaseGridColumnProps,
} from '../../objects/grid';

export { GridRow, type GridRowProps } from '../../objects/grid';
export { ButtonGroup, type ButtonGroupProps } from '../../objects/button-group';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return (
    <div
      className={clsx('govuk-cookie-banner__message', 'govuk-width-container', className)}
      {...props}
    />
  );
}

export type HeadingProps = ComponentProps<'h2'>;

export function Heading({ className, children, ...props }: HeadingProps) {
  return (
    <h2 className={clsx('govuk-cookie-banner__heading', 'govuk-heading-m', className)} {...props}>
      {children}
    </h2>
  );
}

export type ContentProps = ComponentProps<'div'>;

export function Content({ className, ...props }: ContentProps) {
  return <div className={clsx('govuk-cookie-banner__content', className)} {...props} />;
}

export type GridColumnProps = Partial<BaseGridColumnProps>;

export function GridColumn({ width = 'two-thirds', ...props }: GridColumnProps) {
  return <BaseGridColumn width={width} {...props} />;
}
