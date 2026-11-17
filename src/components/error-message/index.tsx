import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type ErrorMessageProps = ComponentProps<'p'>;

/**
 * When there's a validation error, use an error message to explain what went wrong and how to fix it.
 *
 * @see https://design-system.service.gov.uk/components/error-message/
 */
export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return <p className={clsx('govuk-error-message', className)} {...props} />;
}

export type ErrorMessageCompositeProps = ErrorMessageProps & {
  /** A visually hidden prefix used before the error message. Defaults to `"Error"`. */
  visuallyHiddenText?: string | false;
};

/**
 * When there's a validation error, use an error message to explain what went wrong and how to fix it.
 *
 * @see https://design-system.service.gov.uk/components/error-message/
 */
export function ErrorMessageComposite({
  visuallyHiddenText = 'Error',
  children,
  ...props
}: ErrorMessageCompositeProps) {
  return (
    <ErrorMessage {...props}>
      {visuallyHiddenText ? (
        <>
          <VisuallyHidden>{visuallyHiddenText}:</VisuallyHidden> {children}
        </>
      ) : (
        children
      )}
    </ErrorMessage>
  );
}
