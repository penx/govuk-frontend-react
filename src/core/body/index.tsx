import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type Spacing } from '../../overrides';

export type BodyProps = ComponentProps<'p'> & {
  size?: 'l' | 'm' | 's';
  marginBottom?: Spacing;
};

/**
 * Use paragraphs for your core content.
 *
 * @see https://design-system.service.gov.uk/styles/paragraphs/
 */
export function Body({ size, marginBottom, className, ...props }: BodyProps) {
  return (
    <p
      className={clsx(
        size ? `govuk-body-${size}` : 'govuk-body',
        overrideClasses({ marginBottom }),
        className,
      )}
      {...props}
    />
  );
}
