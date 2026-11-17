import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type HintProps = ComponentProps<'div'>;

/**
 * Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.
 *
 * @see https://design-system.service.gov.uk/components/text-input/#hint-text
 */
export function Hint({ className, ...props }: HintProps) {
  return <div className={clsx('govuk-hint', className)} {...props} />;
}
