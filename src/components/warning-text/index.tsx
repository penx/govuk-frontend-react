import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import * as TextParts from './text-parts';

export type IconProps = ComponentProps<'span'>;

export function Icon({ className, ...props }: IconProps) {
  return (
    <span className={clsx('govuk-warning-text__icon', className)} aria-hidden="true" {...props}>
      !
    </span>
  );
}

export { TextParts };

export type TextProps = TextParts.RootProps & {
  iconFallbackText?: string;
};

export function Text({ iconFallbackText, children, ...props }: TextProps) {
  return (
    <TextParts.Root {...props}>
      <TextParts.VisuallyHidden>{iconFallbackText || 'Warning'}</TextParts.VisuallyHidden>
      {hasContent(children) && ' '}
      {children}
    </TextParts.Root>
  );
}

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-warning-text', className)} {...props} />;
}
