import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'div'> & { disableAutoFocus?: boolean };

export function Root({ disableAutoFocus, className, ...props }: RootProps) {
  return (
    <div
      className={clsx('govuk-error-summary', className)}
      {...(disableAutoFocus !== undefined && {
        'data-disable-auto-focus': String(disableAutoFocus),
      })}
      data-module="govuk-error-summary"
      {...props}
    />
  );
}

export type AlertProps = ComponentProps<'div'>;

export function Alert(props: AlertProps) {
  return <div role="alert" {...props} />;
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

/** The link to the field with the error. */
export const ListItemLink = 'a';

export type ListItemCompositeProps = ListItemProps & { href?: string };

/** Links to the field with the error when there's an `href`. */
export function ListItemComposite({ href, children, ...props }: ListItemCompositeProps) {
  return (
    <ListItem {...props}>
      {href ? <ListItemLink href={href}>{children}</ListItemLink> : children}
    </ListItem>
  );
}

export type CompositeProps = Omit<RootProps, 'title' | 'children'> & {
  title: ReactNode;
  description?: ReactNode;
} & (
    | { children?: ReactNode; errors?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        errors: ListItemCompositeProps[];
      }
  );

/** Children are `ListItemComposite`s. */
export function Composite({ title, description, errors, children, ...props }: CompositeProps) {
  const list = errors
    ? errors.map((item, index) => <ListItemComposite key={index} {...item} />)
    : children;
  return (
    <Root {...props}>
      <Alert>
        <Title>{title}</Title>
        <Body>
          {hasContent(description) && <Description>{description}</Description>}
          {hasContent(list) && <List>{list}</List>}
        </Body>
      </Alert>
    </Root>
  );
}
