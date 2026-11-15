import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type CaptionProps = ComponentProps<'span'> & { size: 'xl' | 'l' | 'm' };

export function Caption({ size, className, ...props }: CaptionProps) {
  return <span className={clsx(`govuk-caption-${size}`, className)} {...props} />;
}
