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
  /** The fallback text for the icon. Defaults to `"Warning"`. */
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

/**
 * Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.
 *
 * @see https://design-system.service.gov.uk/components/warning-text/
 */
export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-warning-text', className)} {...props} />;
}

export type CompositeProps = RootProps & Pick<TextCompositeProps, 'iconFallbackText'>;

/**
 * Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.
 *
 * @see https://design-system.service.gov.uk/components/warning-text/
 */
export function Composite({ iconFallbackText, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <Icon /> <TextComposite iconFallbackText={iconFallbackText}>{children}</TextComposite>
    </Root>
  );
}
