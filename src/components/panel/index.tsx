import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type RootProps = ComponentProps<'div'> & {
  variant?: 'confirmation' | 'interruption';
};

export function Root({ className, variant = 'confirmation', ...props }: RootProps) {
  return <div className={clsx('govuk-panel', `govuk-panel--${variant}`, className)} {...props} />;
}

export type TitleProps = ComponentProps<'h1'> & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Title({ className, headingLevel = 1, ...props }: TitleProps) {
  const Heading = `h${headingLevel}` as const;
  return <Heading className={clsx('govuk-panel__title', className)} {...props} />;
}

export type BodyProps = ComponentProps<'div'>;

export function Body({ className, ...props }: BodyProps) {
  return <div className={clsx('govuk-panel__body', className)} {...props} />;
}

export type ActionsProps = ComponentProps<'div'>;

export function Actions({ className, ...props }: ActionsProps) {
  return <div className={clsx('govuk-panel__actions', className)} {...props} />;
}
