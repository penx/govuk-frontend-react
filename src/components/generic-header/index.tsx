import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'div'>;

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
