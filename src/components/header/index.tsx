import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Logo as BaseLogo, type LogoProps as BaseLogoProps } from '@govuk-react/icon-crown';
import { hasContent } from '../../utils/has-content';

export type RootProps = ComponentProps<'div'>;

/**
 * The GOV.UK header shows users that they are on GOV.UK.
 *
 * @see https://design-system.service.gov.uk/components/header/
 */
export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-header', className)} {...props} />;
}

export type ContainerProps = ComponentProps<'div'> & { fullWidth?: boolean };

export function Container({ fullWidth, className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'govuk-header__container',
        fullWidth ? 'govuk-header__container--full-width' : 'govuk-width-container',
        className,
      )}
      {...props}
    />
  );
}

export type LogoProps = ComponentProps<'div'>;

export function Logo({ className, ...props }: LogoProps) {
  return <div className={clsx('govuk-header__logo', className)} {...props} />;
}

export type HomepageLinkProps = ComponentProps<'a'>;

export function HomepageLink({
  href = '//gov.uk',
  className,
  children,
  ...props
}: HomepageLinkProps) {
  return (
    <a href={href} className={clsx('govuk-header__homepage-link', className)} {...props}>
      {children}
    </a>
  );
}

export type LogotypeProps = Omit<BaseLogoProps, 'useLogotype'>;

export function Logotype({ ariaLabelText = 'GOV.UK', className, ...props }: LogotypeProps) {
  return (
    <BaseLogo
      ariaLabelText={ariaLabelText}
      className={clsx('govuk-header__logotype', className)}
      {...props}
    />
  );
}

export type ProductNameProps = ComponentProps<'span'>;

export function ProductName({ className, ...props }: ProductNameProps) {
  return <span className={clsx('govuk-header__product-name', className)} {...props} />;
}

export type CompositeProps = RootProps &
  Pick<ContainerProps, 'fullWidth'> & {
    /** The URL of the homepage. Defaults to the GOV.UK homepage. */
    homepageHref?: string;
    /** Product name, used when the product name follows on directly from ‘GOV.UK’. For example, GOV.UK Pay or GOV.UK Design System. In most circumstances, you should use the [Service navigation component](https://design-system.service.gov.uk/components/service-navigation/). */
    productName?: ReactNode;
    /** Classes for the container, useful if you want to make the header fixed width. */
    containerClassName?: string;
  };

/**
 * The GOV.UK header shows users that they are on GOV.UK.
 *
 * @see https://design-system.service.gov.uk/components/header/
 */
export function Composite({
  homepageHref,
  productName,
  fullWidth,
  containerClassName,
  ...props
}: CompositeProps) {
  return (
    <Root {...props}>
      <Container fullWidth={fullWidth} className={containerClassName}>
        <Logo>
          <HomepageLink {...(homepageHref && { href: homepageHref })}>
            <Logotype />
            {hasContent(productName) && (
              <>
                {' '}
                <ProductName>{productName}</ProductName>
              </>
            )}
          </HomepageLink>
        </Logo>
      </Container>
    </Root>
  );
}
