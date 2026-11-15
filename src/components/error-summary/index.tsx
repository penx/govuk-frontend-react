import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import * as RootParts from './root-parts';

export { RootParts };

export type RootProps = RootParts.RootProps;

export function Root({ children, ...props }: RootProps) {
  return (
    <RootParts.Root {...props}>
      <RootParts.Alert>{children}</RootParts.Alert>
    </RootParts.Root>
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
