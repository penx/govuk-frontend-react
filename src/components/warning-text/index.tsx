import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type WarningTextIconProps = ComponentProps<'span'>;

export function WarningTextIcon({ className, ...props }: WarningTextIconProps) {
  return (
    <span className={clsx('govuk-warning-text__icon', className)} aria-hidden="true" {...props}>
      !
    </span>
  );
}

export type WarningTextTextProps = ComponentProps<'strong'>;

export function WarningTextText({ className, ...props }: WarningTextTextProps) {
  return <strong className={clsx('govuk-warning-text__text', className)} {...props} />;
}

export type WarningTextTextCompositeProps = WarningTextTextProps & {
  /** The fallback text for the icon. Defaults to `"Warning"`. */
  iconFallbackText?: string;
};

export function WarningTextTextComposite({
  iconFallbackText,
  children,
  ...props
}: WarningTextTextCompositeProps) {
  return (
    <WarningTextText {...props}>
      <VisuallyHidden>{iconFallbackText || 'Warning'}</VisuallyHidden>
      {hasContent(children) && ' '}
      {children}
    </WarningTextText>
  );
}

export type WarningTextContainerProps = ComponentProps<'div'>;

/**
 * Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.
 *
 * @see https://design-system.service.gov.uk/components/warning-text/
 */
export function WarningTextContainer({ className, ...props }: WarningTextContainerProps) {
  return <div className={clsx('govuk-warning-text', className)} {...props} />;
}

export type WarningTextProps = WarningTextContainerProps &
  Pick<WarningTextTextCompositeProps, 'iconFallbackText'>;

/**
 * Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.
 *
 * @see https://design-system.service.gov.uk/components/warning-text/
 */
export function WarningText({ iconFallbackText, children, ...props }: WarningTextProps) {
  return (
    <WarningTextContainer {...props}>
      <WarningTextIcon />{' '}
      <WarningTextTextComposite iconFallbackText={iconFallbackText}>
        {children}
      </WarningTextTextComposite>
    </WarningTextContainer>
  );
}
