import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export { WidthContainer, type WidthContainerProps } from '../../objects/width-container';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return <div className={clsx('govuk-footer', className)} {...props} />;
}
