import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type GridRowProps = ComponentProps<'div'>;

export function GridRow({ className, ...props }: GridRowProps) {
  return <div className={clsx('govuk-grid-row', className)} {...props} />;
}

type ColumnWidth =
  'full' | 'one-half' | 'one-third' | 'two-thirds' | 'one-quarter' | 'three-quarters';

export type GridColumnProps = ComponentProps<'div'> & {
  width: ColumnWidth | `${ColumnWidth}-from-desktop`;
};

export function GridColumn({ width, className, ...props }: GridColumnProps) {
  return <div className={clsx(`govuk-grid-column-${width}`, className)} {...props} />;
}
