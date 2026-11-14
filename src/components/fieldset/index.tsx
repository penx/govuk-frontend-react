import type { ComponentProps, ReactNode } from 'react';
import { classNameLookup, cx, type ClassNames } from '../../utils/class-names';
import { hasContent, isPropsObject } from '../../utils/is-props-object';

export type FieldsetClassName =
  | 'govuk-fieldset'
  | 'govuk-fieldset__legend'
  | 'govuk-fieldset__legend--s'
  | 'govuk-fieldset__legend--m'
  | 'govuk-fieldset__legend--l'
  | 'govuk-fieldset__legend--xl'
  | 'govuk-fieldset__heading';

export type FieldsetHeadingProps = ComponentProps<'h1'> & {
  classNames?: ClassNames<FieldsetClassName>;
};

function Heading({ className, classNames, children, ...props }: FieldsetHeadingProps) {
  const cn = classNameLookup(classNames);
  return (
    <h1 className={cx(cn('govuk-fieldset__heading'), className)} {...props}>
      {children}
    </h1>
  );
}

export type FieldsetLegendProps = ComponentProps<'legend'> & {
  classNames?: ClassNames<FieldsetClassName>;
  isPageHeading?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
};

function Legend({
  className,
  classNames,
  isPageHeading,
  size,
  children,
  ...props
}: FieldsetLegendProps) {
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

export type FieldsetProps = ComponentProps<'fieldset'> & {
  classNames?: ClassNames<FieldsetClassName>;
  legend?: ReactNode | FieldsetLegendProps;
};

function FieldsetBase({ className, classNames, legend, children, ...props }: FieldsetProps) {
  const cn = classNameLookup(classNames);
  const legendProps: FieldsetLegendProps = isPropsObject<FieldsetLegendProps>(legend)
    ? legend
    : { children: legend };
  return (
    <fieldset className={cx(cn('govuk-fieldset'), className)} {...props}>
      <Legend {...legendProps} classNames={{ ...classNames, ...legendProps.classNames }} />
      {children}
    </fieldset>
  );
}

export const Fieldset = Object.assign(FieldsetBase, { Legend, Heading });
