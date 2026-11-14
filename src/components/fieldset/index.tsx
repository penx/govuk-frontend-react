import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent, isPropsObject } from '../../utils/is-props-object';

export type HeadingProps = ComponentProps<'h1'>;

export function Heading({ className, children, ...props }: HeadingProps) {
  return (
    <h1 className={clsx('govuk-fieldset__heading', className)} {...props}>
      {children}
    </h1>
  );
}

export type LegendProps = ComponentProps<'legend'> & {
  isPageHeading?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Legend({ className, isPageHeading, size, children, ...props }: LegendProps) {
  if (!hasContent(children)) return null;
  return (
    <legend
      className={clsx(
        'govuk-fieldset__legend',
        size && `govuk-fieldset__legend--${size}`,
        className,
      )}
      {...props}
    >
      {isPageHeading ? <Heading>{children}</Heading> : children}
    </legend>
  );
}

export type RootProps = ComponentProps<'fieldset'> & {
  legend?: ReactNode | LegendProps;
};

export function Root({ className, legend, children, ...props }: RootProps) {
  const legendProps: LegendProps = isPropsObject<LegendProps>(legend)
    ? legend
    : { children: legend };
  return (
    <fieldset className={clsx('govuk-fieldset', className)} {...props}>
      <Legend {...legendProps} />
      {children}
    </fieldset>
  );
}
