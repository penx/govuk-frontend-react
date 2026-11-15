import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type IconProps = ComponentProps<'span'>;

export function Icon({ className, ...props }: IconProps) {
  return (
    <span className={clsx('govuk-warning-text__icon', className)} aria-hidden="true" {...props}>
      !
    </span>
  );
}

export type TextProps = ComponentProps<'strong'>;

export function Text({ className, ...props }: TextProps) {
  return <strong className={clsx('govuk-warning-text__text', className)} {...props} />;
}

export type TextCompositeProps = TextProps & {
  iconFallbackText?: string;
};

export function TextComposite({ iconFallbackText, children, ...props }: TextCompositeProps) {
  return (
    <Text {...props}>
      <VisuallyHidden>{iconFallbackText || 'Warning'}</VisuallyHidden>
      {hasContent(children) && ' '}
      {children}
    </Text>
  );
}

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-warning-text', className)} {...props} />;
}

export type CompositeProps = RootProps & Pick<TextCompositeProps, 'iconFallbackText'>;

export function Composite({ iconFallbackText, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <Icon /> <TextComposite iconFallbackText={iconFallbackText}>{children}</TextComposite>
    </Root>
  );
}
