import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

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

/** The task's name when it has no link. */
export const Title = 'div';

export type ItemCompositeProps = Omit<ItemProps, 'title' | 'withLink'> & {
  idPrefix: string;
  title: ReactNode;
  href?: string;
  hint?: ReactNode;
  status: ReactNode;
  cannotStartYet?: boolean;
};

/** `idPrefix` prefixes the hint and status ids. */
export function ItemComposite({
  idPrefix,
  title,
  href,
  hint,
  status,
  cannotStartYet,
  ...props
}: ItemCompositeProps) {
  const hintId = hasContent(hint) ? `${idPrefix}-hint` : undefined;
  const statusId = `${idPrefix}-status`;
  return (
    <Item withLink={Boolean(href)} {...props}>
      <NameAndHint>
        {href ? (
          <Link href={href} aria-describedby={hintId ? `${hintId} ${statusId}` : statusId}>
            {title}
          </Link>
        ) : (
          <Title>{title}</Title>
        )}
        {hintId && <Hint id={hintId}>{hint}</Hint>}
      </NameAndHint>
      <Status id={statusId} cannotStartYet={cannotStartYet}>
        {status}
      </Status>
    </Item>
  );
}

export type CompositeProps = Omit<RootProps, 'children'> & { idPrefix?: string } & (
    | { children?: ReactNode; items?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        items: (Omit<ItemCompositeProps, 'idPrefix'> & { idPrefix?: string })[];
      }
  );

/** Children are `ItemComposite`s. With `items`, each `idPrefix` defaults to `idPrefix` and its position. */
export function Composite({ idPrefix = 'task-list', items, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      {items
        ? items.map((item, index) => (
            <ItemComposite key={index} idPrefix={`${idPrefix}-${index + 1}`} {...item} />
          ))
        : children}
    </Root>
  );
}
