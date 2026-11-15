import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { Crown as BaseCrown, type CrownProps } from '@govuk-react/icon-crown';

export { WidthContainer, type WidthContainerProps } from '../../objects/width-container';
export type { CrownProps };

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-footer', className)} {...props} />;
}

export function Crown({ className, ...props }: CrownProps) {
  return <BaseCrown className={clsx('govuk-footer__crown', className)} {...props} />;
}
