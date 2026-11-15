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
  heading?: ReactNode;
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
