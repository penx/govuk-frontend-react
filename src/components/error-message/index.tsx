import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { VisuallyHidden } from '../../utilities/visually-hidden';

export type ErrorMessageProps = ComponentProps<'p'>;

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return <p className={clsx('govuk-error-message', className)} {...props} />;
}

export type ErrorMessageCompositeProps = ErrorMessageProps & {
  visuallyHiddenText?: string | false;
};

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
