import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/is-props-object';

export type LabelProps = ComponentProps<'label'> & {
  isPageHeading?: boolean;
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Label({ className, isPageHeading, size, children, ...props }: LabelProps) {
  if (!hasContent(children)) return null;
  const label = (
    <label className={clsx('govuk-label', size && `govuk-label--${size}`, className)} {...props}>
      {children}
    </label>
  );
  return isPageHeading ? <h1 className="govuk-label-wrapper">{label}</h1> : label;
}
