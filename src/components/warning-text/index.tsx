import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type WarningTextProps = ComponentProps<'div'> & {
  /** The fallback text for the icon. Defaults to `"Warning"`. */
  iconFallbackText?: string;
};

/**
 * Use the warning text component when you need to warn users about something important, such as legal consequences of an action, or lack of action, that they might take.
 *
 * @see https://design-system.service.gov.uk/components/warning-text/
 */
export function WarningText({ iconFallbackText, className, children, ...props }: WarningTextProps) {
  return (
    <div className={clsx('govuk-warning-text', className)} {...props}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>{' '}
      <strong className="govuk-warning-text__text">
        <VisuallyHidden>{iconFallbackText || 'Warning'}</VisuallyHidden>
        {hasContent(children) && ' '}
        {children}
      </strong>
    </div>
  );
}
