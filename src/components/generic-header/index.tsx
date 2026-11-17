import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'div'>;

/**
 * A generic header to help services not on GOV.UK.
 *
 * @see https://design-system.service.gov.uk/components/generic-header/
 */
export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-generic-header', className)} {...props} />;
}

export type ContainerProps = ComponentProps<'div'> & { fullWidth?: boolean };

export function Container({ fullWidth, className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'govuk-generic-header__container',
        fullWidth ? 'govuk-generic-header__container--full-width' : 'govuk-width-container',
        className,
      )}
      {...props}
    />
  );
}

export type LogoProps = ComponentProps<'div'>;

export function Logo({ className, ...props }: LogoProps) {
  return <div className={clsx('govuk-generic-header__logo', className)} {...props} />;
}

export type HomepageLinkProps = ComponentProps<'a'>;

export function HomepageLink({ href = '/', className, children, ...props }: HomepageLinkProps) {
  return (
    <a href={href} className={clsx('govuk-generic-header__homepage-link', className)} {...props}>
      {children}
    </a>
  );
}

export type CompositeProps = RootProps &
  Pick<ContainerProps, 'fullWidth'> & {
    /** The URL of the logo link. Defaults to the root of the current web domain ("/"). */
    homepageHref?: string;
    /** Classes for the container. Useful if you want to make the Generic header fixed width. */
    containerClassName?: string;
  };

/**
 * A generic header to help services not on GOV.UK.
 *
 * Children are the logo.
 *
 * @see https://design-system.service.gov.uk/components/generic-header/
 */
export function Composite({
  homepageHref,
  fullWidth,
  containerClassName,
  children,
  ...props
}: CompositeProps) {
  return (
    <Root {...props}>
      <Container fullWidth={fullWidth} className={containerClassName}>
        <Logo>
          <HomepageLink {...(homepageHref && { href: homepageHref })}>{children}</HomepageLink>
        </Logo>
      </Container>
    </Root>
  );
}
