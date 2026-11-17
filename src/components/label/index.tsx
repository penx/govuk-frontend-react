import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type LabelProps = ComponentProps<'label'> & {
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Label({ className, size, children, ...props }: LabelProps) {
  return (
    <label className={clsx('govuk-label', size && `govuk-label--${size}`, className)} {...props}>
      {children}
    </label>
  );
}

export type LabelWrapperProps = ComponentProps<'h1'>;

export function LabelWrapper({ className, children, ...props }: LabelWrapperProps) {
  return (
    <h1 className={clsx('govuk-label-wrapper', className)} {...props}>
      {children}
    </h1>
  );
}

export type LabelCompositeProps = LabelProps & {
  /** Whether the label also acts as the heading for the page. */
  isPageHeading?: boolean;
};

export function LabelComposite({ isPageHeading, children, ...props }: LabelCompositeProps) {
  if (!hasContent(children)) return null;
  const label = <Label {...props}>{children}</Label>;
  return isPageHeading ? <LabelWrapper>{label}</LabelWrapper> : label;
}
