import type { ComponentProps, ReactNode } from 'react';
import { classNameLookup, cx, type ClassNames } from '../../utils/class-names';
import { hasContent, isPropsObject } from '../../utils/is-props-object';

export type ClassName =
  | 'govuk-fieldset'
  | 'govuk-fieldset__legend'
  | 'govuk-fieldset__legend--s'
  | 'govuk-fieldset__legend--m'
  | 'govuk-fieldset__legend--l'
  | 'govuk-fieldset__legend--xl'
  | 'govuk-fieldset__heading';

export type HeadingProps = ComponentProps<'h1'> & {
  classNames?: ClassNames<ClassName>;
};

export function Heading({ className, classNames, children, ...props }: HeadingProps) {
  const cn = classNameLookup(classNames);
  return (
    <h1 className={cx(cn('govuk-fieldset__heading'), className)} {...props}>
      {children}
    </h1>
  );
}

export type LegendProps = ComponentProps<'legend'> & {
  classNames?: ClassNames<ClassName>;
  isPageHeading?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Legend({
  className,
  classNames,
  isPageHeading,
  size,
  children,
  ...props
}: LegendProps) {
  if (!hasContent(children)) return null;
  const cn = classNameLookup(classNames);
  return (
    <legend
      className={cx(
        cn('govuk-fieldset__legend', size && `govuk-fieldset__legend--${size}`),
        className,
      )}
      {...props}
    >
      {isPageHeading ? <Heading classNames={classNames}>{children}</Heading> : children}
    </legend>
  );
}

export type RootProps = ComponentProps<'fieldset'> & {
  classNames?: ClassNames<ClassName>;
  legend?: ReactNode | LegendProps;
};

export function Root({ className, classNames, legend, children, ...props }: RootProps) {
  const cn = classNameLookup(classNames);
  const legendProps: LegendProps = isPropsObject<LegendProps>(legend)
    ? legend
    : { children: legend };
  return (
    <fieldset className={cx(cn('govuk-fieldset'), className)} {...props}>
      <Legend {...legendProps} classNames={{ ...classNames, ...legendProps.classNames }} />
      {children}
    </fieldset>
  );
}
