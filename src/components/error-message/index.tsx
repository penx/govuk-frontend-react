import type { ComponentProps } from 'react';
import * as ErrorMessageParts from './parts';

export { ErrorMessageParts };

export type ErrorMessageProps = ComponentProps<'p'> & {
  visuallyHiddenText?: string | false;
};

export function ErrorMessage({
  visuallyHiddenText = 'Error',
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <ErrorMessageParts.Root {...props}>
      {visuallyHiddenText ? (
        <>
          <ErrorMessageParts.VisuallyHidden>{visuallyHiddenText}:</ErrorMessageParts.VisuallyHidden>{' '}
          {children}
        </>
      ) : (
        children
      )}
    </ErrorMessageParts.Root>
  );
}
