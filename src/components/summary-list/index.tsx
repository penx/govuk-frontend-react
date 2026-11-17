import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Slot } from '../../utils/slot';
import { overrideClasses, type FluidWidth } from '../../overrides';
import { hasContent } from '../../utils/has-content';

import { VisuallyHidden } from '../../utilities/visually-hidden';

export * as Card from './card';

export type RootProps = ComponentProps<'dl'> & {
  noBorder?: boolean;
};

export function Root({ className, noBorder, ...props }: RootProps) {
  return (
    <dl
      className={clsx('govuk-summary-list', noBorder && 'govuk-summary-list--no-border', className)}
      {...props}
    />
  );
}

export type RowProps = ComponentProps<'div'> & {
  noActions?: boolean;
  noBorder?: boolean;
};

export function Row({ className, noActions, noBorder, ...props }: RowProps) {
  return (
    <div
      className={clsx(
        'govuk-summary-list__row',
        noActions && 'govuk-summary-list__row--no-actions',
        noBorder && 'govuk-summary-list__row--no-border',
        className,
      )}
      {...props}
    />
  );
}

export type KeyProps = ComponentProps<'dt'> & { width?: FluidWidth };

export function Key({ width, className, ...props }: KeyProps) {
  return (
    <dt
      className={clsx('govuk-summary-list__key', overrideClasses({ width }), className)}
      {...props}
    />
  );
}

export type ValueProps = ComponentProps<'dd'> & { width?: FluidWidth };

export function Value({ width, className, ...props }: ValueProps) {
  return (
    <dd
      className={clsx('govuk-summary-list__value', overrideClasses({ width }), className)}
      {...props}
    />
  );
}

export type ActionsProps = ComponentProps<'dd'> & { width?: FluidWidth };

export function Actions({ width, className, ...props }: ActionsProps) {
  return (
    <dd
      className={clsx('govuk-summary-list__actions', overrideClasses({ width }), className)}
      {...props}
    />
  );
}

export type ActionsListProps = ComponentProps<'ul'>;

export function ActionsList({ className, ...props }: ActionsListProps) {
  return <ul className={clsx('govuk-summary-list__actions-list', className)} {...props} />;
}

export type ActionsListItemProps = ComponentProps<'li'>;

export function ActionsListItem({ className, ...props }: ActionsListItemProps) {
  return <li className={clsx('govuk-summary-list__actions-list-item', className)} {...props} />;
}

export type ActionProps = ComponentProps<'a'> & {
  /** Render the only child (such as a router's link) instead of an `a`, with the link classes merged onto it. */
  asChild?: boolean;
};

export function Action({ className, asChild, children, ...props }: ActionProps) {
  const Element = asChild ? Slot : 'a';
  return (
    <Element className={clsx('govuk-link', className)} {...props}>
      {children}
    </Element>
  );
}

export type ActionCompositeProps = ActionProps & {
  visuallyHiddenText?: ReactNode;
};

export function ActionComposite({ visuallyHiddenText, children, ...props }: ActionCompositeProps) {
  return (
    <Action {...props}>
      {children}
      {hasContent(visuallyHiddenText) && <VisuallyHidden> {visuallyHiddenText}</VisuallyHidden>}
    </Action>
  );
}

export type RowCompositeProps = RowProps & {
  term: ReactNode;
  value: ReactNode;
  actions?: ReactNode[];
};

/** Pass `noActions` on a row without actions when other rows have them. */
export function RowComposite({ term, value, actions = [], ...props }: RowCompositeProps) {
  return (
    <Row {...props}>
      <Key>{term}</Key>
      <Value>{value}</Value>
      {actions.length > 0 && (
        <Actions>
          {actions.length === 1 ? (
            actions[0]
          ) : (
            <ActionsList>
              {actions.map((action, index) => (
                <ActionsListItem key={index}>{action}</ActionsListItem>
              ))}
            </ActionsList>
          )}
        </Actions>
      )}
    </Row>
  );
}

export type CompositeProps = Omit<RootProps, 'children'> &
  (
    | { children?: ReactNode; rows?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        rows: RowCompositeProps[];
      }
  );

/** Children are `RowComposite`s. With `rows`, rows without actions get `noActions` when others have them. */
export function Composite({ rows, children, ...props }: CompositeProps) {
  const anyActions = rows?.some((row) => row.actions?.length);
  return (
    <Root {...props}>
      {rows
        ? rows.map((row, index) => (
            <RowComposite key={index} noActions={anyActions && !row.actions?.length} {...row} />
          ))
        : children}
    </Root>
  );
}
