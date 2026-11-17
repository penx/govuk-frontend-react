import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type InsetTextProps = ComponentProps<'div'>;

/**
 * Use the inset text component to differentiate a block of text from the content that surrounds it.
 *
 * @see https://design-system.service.gov.uk/components/inset-text/
 */
export function InsetText({ className, ...props }: InsetTextProps) {
  return <div className={clsx('govuk-inset-text', className)} {...props} />;
}
