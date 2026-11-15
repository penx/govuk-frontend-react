import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import {
  GridColumn as BaseGridColumn,
  type GridColumnProps as BaseGridColumnProps,
} from '../../objects/grid';

import { GridRow } from '../../objects/grid';

export { GridRow, type GridRowProps } from '../../objects/grid';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-feedback', 'govuk-width-container', className)} {...props} />;
}

export type GridColumnProps = Partial<BaseGridColumnProps>;

export function GridColumn({ width = 'two-thirds', ...props }: GridColumnProps) {
  return <BaseGridColumn width={width} {...props} />;
}

export type TitleProps = ComponentProps<'h2'> & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Title({ headingLevel = 2, className, ...props }: TitleProps) {
  const Heading = `h${headingLevel}` as const;
  return <Heading className={clsx('govuk-feedback__title', className)} {...props} />;
}

export type BodyProps = ComponentProps<'div'>;

export function Body({ className, ...props }: BodyProps) {
  return <div className={clsx('govuk-feedback__body', className)} {...props} />;
}

export type CompositeProps = RootProps;

export function Composite({ children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <GridRow>
        <GridColumn>{children}</GridColumn>
      </GridRow>
    </Root>
  );
}
