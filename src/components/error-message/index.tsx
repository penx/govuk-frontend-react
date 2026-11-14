import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type ErrorMessageProps = ComponentProps<'p'> & {
  visuallyHiddenText?: string | false;
};

export function ErrorMessage({
  className,
  visuallyHiddenText = 'Error',
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <p className={clsx('govuk-error-message', className)} {...props}>
      {visuallyHiddenText ? (
        <>
          <span className="govuk-visually-hidden">{visuallyHiddenText}:</span> {children}
        </>
      ) : (
        children
      )}
    </p>
  );
}
