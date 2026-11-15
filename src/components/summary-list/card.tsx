import type { ComponentProps, ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-summary-card', className)} {...props} />;
}

export type TitleWrapperProps = ComponentProps<'div'>;

export function TitleWrapper({ className, ...props }: TitleWrapperProps) {
  return <div className={clsx('govuk-summary-card__title-wrapper', className)} {...props} />;
}

export type TitleProps = ComponentProps<'h2'> & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Title({ className, headingLevel = 2, ...props }: TitleProps) {
  const Heading = `h${headingLevel}` as const;
  return <Heading className={clsx('govuk-summary-card__title', className)} {...props} />;
}

export type ActionsProps<As extends ElementType = 'div'> = ComponentProps<As> & {
  as?: As;
};

export function Actions<As extends 'div' | 'ul' = 'div'>(props: ActionsProps<As>): ReactNode;
export function Actions({ as, className, ...props }: ActionsProps<ElementType>) {
  const Element: ElementType = as ?? 'div';
  return <Element className={clsx('govuk-summary-card__actions', className)} {...props} />;
}

export type ActionProps = ComponentProps<'li'>;

export function Action({ className, ...props }: ActionProps) {
  return <li className={clsx('govuk-summary-card__action', className)} {...props} />;
}

export type ContentProps = ComponentProps<'div'>;

export function Content({ className, ...props }: ContentProps) {
  return <div className={clsx('govuk-summary-card__content', className)} {...props} />;
}

export type CompositeProps = Omit<RootProps, 'title'> &
  Pick<TitleProps, 'headingLevel'> & {
    title?: ReactNode;
    actions?: ReactNode[];
  };

/** Wrap a summary list in a card. */
export function Composite({
  title,
  headingLevel,
  actions = [],
  children,
  ...props
}: CompositeProps) {
  return (
    <Root {...props}>
      <TitleWrapper>
        {hasContent(title) && <Title headingLevel={headingLevel}>{title}</Title>}
        {actions.length === 1 ? (
          <Actions>{actions[0]}</Actions>
        ) : actions.length > 1 ? (
          <Actions as="ul">
            {actions.map((action, index) => (
              <Action key={index}>{action}</Action>
            ))}
          </Actions>
        ) : null}
      </TitleWrapper>
      <Content>{children}</Content>
    </Root>
  );
}
