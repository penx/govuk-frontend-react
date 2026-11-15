import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import * as MessageParts from './message-parts';

export { MessageParts };

export type RootProps = ComponentProps<'div'>;

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

export type MessageProps = MessageParts.RootProps & {
  heading?: ReactNode;
  actions?: ReactNode;
};

export function Message({ heading, actions, children, ...props }: MessageProps) {
  return (
    <MessageParts.Root {...props}>
      <MessageParts.GridRow>
        <MessageParts.GridColumn>
          {heading ? <MessageParts.Heading>{heading}</MessageParts.Heading> : null}
          <MessageParts.Content>{children}</MessageParts.Content>
        </MessageParts.GridColumn>
      </MessageParts.GridRow>
      {actions ? <MessageParts.ButtonGroup>{actions}</MessageParts.ButtonGroup> : null}
    </MessageParts.Root>
  );
}
