import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { GridColumn, GridRow } from '../../objects/grid';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, children, ...props }: RootProps) {
  return (
    <div className={clsx('govuk-feedback', 'govuk-width-container', className)} {...props}>
      <GridRow>
        <GridColumn width="two-thirds">{children}</GridColumn>
      </GridRow>
    </div>
  );
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
