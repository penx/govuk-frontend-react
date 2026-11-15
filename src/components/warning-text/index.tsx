import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type IconProps = ComponentProps<'span'>;

export function Icon({ className, ...props }: IconProps) {
  return (
    <span className={clsx('govuk-warning-text__icon', className)} aria-hidden="true" {...props}>
      !
    </span>
  );
}

export type TextProps = ComponentProps<'strong'> & {
  iconFallbackText?: string;
};

export function Text({ className, iconFallbackText, children, ...props }: TextProps) {
  return (
    <strong className={clsx('govuk-warning-text__text', className)} {...props}>
      <span className="govuk-visually-hidden">{iconFallbackText || 'Warning'}</span>
      {hasContent(children) && ' '}
      {children}
    </strong>
  );
}

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-warning-text', className)} {...props} />;
}
