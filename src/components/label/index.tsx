import type { ComponentProps } from 'react';
import { classNameLookup, cx, type ClassNames } from '../../utils/class-names';
import { hasContent } from '../../utils/is-props-object';

export type LabelClassName =
  | 'govuk-label'
  | 'govuk-label-wrapper'
  | 'govuk-label--s'
  | 'govuk-label--m'
  | 'govuk-label--l'
  | 'govuk-label--xl';

export type LabelProps = ComponentProps<'label'> & {
  classNames?: ClassNames<LabelClassName>;
  isPageHeading?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Label({
  className,
  classNames,
  isPageHeading,
  size,
  children,
  ...props
}: LabelProps) {
  if (!hasContent(children)) return null;
  const cn = classNameLookup(classNames);
  const label = (
    <label className={cx(cn('govuk-label', size && `govuk-label--${size}`), className)} {...props}>
      {children}
    </label>
  );
  return isPageHeading ? <h1 className={cn('govuk-label-wrapper')}>{label}</h1> : label;
}
