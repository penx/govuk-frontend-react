import type { ComponentProps } from 'react';
import { classNameLookup, cx, type ClassNames } from '../../utils/class-names';

export type ErrorMessageClassName = 'govuk-error-message' | 'govuk-visually-hidden';

export type ErrorMessageProps = ComponentProps<'p'> & {
  classNames?: ClassNames<ErrorMessageClassName>;
  visuallyHiddenText?: string | false;
};

export function ErrorMessage({
  className,
  classNames,
  visuallyHiddenText = 'Error',
  children,
  ...props
}: ErrorMessageProps) {
  const cn = classNameLookup(classNames);
  return (
    <p className={cx(cn('govuk-error-message'), className)} {...props}>
      {visuallyHiddenText ? (
        <>
          <span className={cn('govuk-visually-hidden')}>{visuallyHiddenText}:</span> {children}
        </>
      ) : (
        children
      )}
    </p>
  );
}
