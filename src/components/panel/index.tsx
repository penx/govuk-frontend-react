import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'div'> & {
  variant?: 'confirmation' | 'interruption';
};

/**
 * Use the Panel component to display important information in within confirmation and interruption pages.
 *
 * @see https://design-system.service.gov.uk/components/panel/
 */
export function Root({ className, variant = 'confirmation', ...props }: RootProps) {
  return <div className={clsx('govuk-panel', `govuk-panel--${variant}`, className)} {...props} />;
}

export type TitleProps = ComponentProps<'h1'> & {
  /** Heading level, from `1` to `6`. Default is `1`. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Title({ className, headingLevel = 1, ...props }: TitleProps) {
  const Heading = `h${headingLevel}` as const;
  return <Heading className={clsx('govuk-panel__title', className)} {...props} />;
}

export type BodyProps = ComponentProps<'div'>;

export function Body({ className, ...props }: BodyProps) {
  return <div className={clsx('govuk-panel__body', className)} {...props} />;
}

export type ActionsProps = ComponentProps<'div'>;

export function Actions({ className, ...props }: ActionsProps) {
  return <div className={clsx('govuk-panel__actions', className)} {...props} />;
}

export type CompositeProps = Omit<RootProps, 'title'> &
  Pick<TitleProps, 'headingLevel'> & {
    title: ReactNode;
    /** Can be used when creating an [interruption panel](https://design-system.service.gov.uk/components/panel/#interruption-panel) which will add a button or link. */
    actions?: ReactNode;
  };

/**
 * Use the Panel component to display important information in within confirmation and interruption pages.
 *
 * @see https://design-system.service.gov.uk/components/panel/
 */
export function Composite({ title, headingLevel, actions, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <Title headingLevel={headingLevel}>{title}</Title>
      {hasContent(children) && <Body>{children}</Body>}
      {hasContent(actions) && <Actions>{actions}</Actions>}
    </Root>
  );
}
