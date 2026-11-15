import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

const defaultTitleId = 'govuk-notification-banner-title';

export type RootProps = ComponentProps<'div'> & {
  success?: boolean;
  disableAutoFocus?: boolean;
};

export function Root({ success, disableAutoFocus, className, ...props }: RootProps) {
  return (
    <div
      className={clsx(
        'govuk-notification-banner',
        success && 'govuk-notification-banner--success',
        className,
      )}
      role={success ? 'alert' : 'region'}
      aria-labelledby={defaultTitleId}
      data-module="govuk-notification-banner"
      {...(disableAutoFocus !== undefined && {
        'data-disable-auto-focus': String(disableAutoFocus),
      })}
      {...props}
    />
  );
}

export type HeaderProps = ComponentProps<'div'>;

export function Header({ className, ...props }: HeaderProps) {
  return <div className={clsx('govuk-notification-banner__header', className)} {...props} />;
}

export type TitleProps = ComponentProps<'h2'> & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Title({ headingLevel = 2, className, children, ...props }: TitleProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Heading
      className={clsx('govuk-notification-banner__title', className)}
      id={defaultTitleId}
      {...props}
    >
      {hasContent(children) ? children : 'Important'}
    </Heading>
  );
}

export type ContentProps = ComponentProps<'div'>;

export function Content({ className, ...props }: ContentProps) {
  return <div className={clsx('govuk-notification-banner__content', className)} {...props} />;
}

export type HeadingProps = ComponentProps<'p'>;

export function Heading({ className, ...props }: HeadingProps) {
  return <p className={clsx('govuk-notification-banner__heading', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a className={clsx('govuk-notification-banner__link', className)} {...props}>
      {children}
    </a>
  );
}

export type CompositeProps = Omit<RootProps, 'title'> & {
  title?: ReactNode;
  titleId?: string;
  titleHeadingLevel?: TitleProps['headingLevel'];
  heading?: ReactNode;
};

export function Composite({
  title,
  titleId,
  titleHeadingLevel,
  heading,
  success,
  children,
  ...props
}: CompositeProps) {
  return (
    <Root success={success} {...(titleId && { 'aria-labelledby': titleId })} {...props}>
      <Header>
        <Title headingLevel={titleHeadingLevel} {...(titleId && { id: titleId })}>
          {hasContent(title) ? title : success ? 'Success' : undefined}
        </Title>
      </Header>
      <Content>
        {hasContent(heading) && <Heading>{heading}</Heading>}
        {children}
      </Content>
    </Root>
  );
}
