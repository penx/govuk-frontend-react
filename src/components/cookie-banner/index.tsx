import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import {
  GridColumn as BaseGridColumn,
  type GridColumnProps as BaseGridColumnProps,
} from '../../objects/grid';

import { ButtonGroup } from '../../objects/button-group';
import { GridRow } from '../../objects/grid';

export { GridRow, type GridRowProps } from '../../objects/grid';
export { ButtonGroup, type ButtonGroupProps } from '../../objects/button-group';

export type RootProps = ComponentProps<'div'>;

/**
 * Allow users to accept or reject cookies which are not essential to making your service work.
 *
 * @see https://design-system.service.gov.uk/components/cookie-banner/
 */
export function Root({
  className,
  'aria-label': ariaLabel = 'Cookie banner',
  ...props
}: RootProps) {
  return (
    <div
      className={clsx('govuk-cookie-banner', className)}
      data-nosnippet=""
      role="region"
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export type MessageProps = ComponentProps<'div'>;

export function Message({ className, ...props }: MessageProps) {
  return (
    <div
      className={clsx('govuk-cookie-banner__message', 'govuk-width-container', className)}
      {...props}
    />
  );
}

export type HeadingProps = ComponentProps<'h2'>;

export function Heading({ className, children, ...props }: HeadingProps) {
  return (
    <h2 className={clsx('govuk-cookie-banner__heading', 'govuk-heading-m', className)} {...props}>
      {children}
    </h2>
  );
}

export type ContentProps = ComponentProps<'div'>;

export function Content({ className, ...props }: ContentProps) {
  return <div className={clsx('govuk-cookie-banner__content', className)} {...props} />;
}

export type GridColumnProps = Partial<BaseGridColumnProps>;

export function GridColumn({ width = 'two-thirds', ...props }: GridColumnProps) {
  return <BaseGridColumn width={width} {...props} />;
}

export type MessageCompositeProps = MessageProps & {
  /** The heading that displays in the message. */
  heading?: ReactNode;
  /** The buttons and links that you want to display in the message. */
  actions?: ReactNode;
};

export function MessageComposite({ heading, actions, children, ...props }: MessageCompositeProps) {
  return (
    <Message {...props}>
      <GridRow>
        <GridColumn>
          {heading ? <Heading>{heading}</Heading> : null}
          <Content>{children}</Content>
        </GridColumn>
      </GridRow>
      {actions ? <ButtonGroup>{actions}</ButtonGroup> : null}
    </Message>
  );
}

export type CompositeProps = RootProps & Pick<MessageCompositeProps, 'heading' | 'actions'>;

/**
 * Allow users to accept or reject cookies which are not essential to making your service work.
 *
 * A banner with one message. Use `Root` and `MessageComposite` for more.
 *
 * @see https://design-system.service.gov.uk/components/cookie-banner/
 */
export function Composite({ heading, actions, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <MessageComposite heading={heading} actions={actions}>
        {children}
      </MessageComposite>
    </Root>
  );
}
