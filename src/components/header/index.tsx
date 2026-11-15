import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { Logo as BaseLogo, type LogoProps as BaseLogoProps } from '@govuk-react/icon-crown';

export type RootProps = ComponentProps<'div'>;

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
