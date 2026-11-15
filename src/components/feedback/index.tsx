import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import * as RootParts from './root-parts';

export { RootParts };

export type RootProps = RootParts.RootProps;

export function Root({ children, ...props }: RootProps) {
  return (
    <RootParts.Root {...props}>
      <RootParts.GridRow>
        <RootParts.GridColumn>{children}</RootParts.GridColumn>
      </RootParts.GridRow>
    </RootParts.Root>
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
