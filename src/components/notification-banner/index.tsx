import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

const defaultTitleId = 'govuk-notification-banner-title';

export type RootProps = ComponentProps<'div'> & {
  /** Use to tell the user about the outcome of something they’ve just done. The notification banner sets `role` to `"alert"`. */
  success?: boolean;
  /** If you set `success`, or `role` to `"alert"`, JavaScript moves the keyboard focus to the notification banner when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`. */
  disableAutoFocus?: boolean;
};

/**
 * Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content.
 *
 * @see https://design-system.service.gov.uk/components/notification-banner/
 */
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
  /** Sets heading level for the title only. You can only use values between `1` and `6` with this option. The default is `2`. */
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
  /** The title that displays in the notification banner. Defaults to `"Important"`, or `"Success"` if you set `success`. */
  title?: ReactNode;
  /** The `id` for the banner title, and the `aria-labelledby` attribute in the banner. Defaults to `"govuk-notification-banner-title"`. */
  titleId?: string;
  /** Sets heading level for the title only. You can only use values between `1` and `6` with this option. The default is `2`. */
  titleHeadingLevel?: TitleProps['headingLevel'];
  heading?: ReactNode;
};

/**
 * Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content.
 *
 * @see https://design-system.service.gov.uk/components/notification-banner/
 */
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
