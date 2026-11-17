import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type CaptionProps = ComponentProps<'span'> & { size: 'xl' | 'l' | 'm' };

/**
 * Sometimes you may need to make it clear that a page is part of a larger section or group. To do this, you can use a heading with a caption above it.
 *
 * @see https://design-system.service.gov.uk/styles/headings/#headings-with-captions
 */
export function Caption({ size, className, ...props }: CaptionProps) {
  return <span className={clsx(`govuk-caption-${size}`, className)} {...props} />;
}
