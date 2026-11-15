import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'div'> & { disableAutoFocus?: boolean };

export function Root({ disableAutoFocus, className, ...props }: RootProps) {
  return (
    <div
      className={clsx('govuk-error-summary', className)}
      {...(disableAutoFocus !== undefined && {
        'data-disable-auto-focus': String(disableAutoFocus),
      })}
      data-module="govuk-error-summary"
      {...props}
    />
  );
}

export type AlertProps = ComponentProps<'div'>;

export function Alert(props: AlertProps) {
  return <div role="alert" {...props} />;
}
