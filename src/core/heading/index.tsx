import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { overrideClasses, type Spacing } from '../../overrides';

export type HeadingProps = ComponentProps<'h2'> & {
  size: 'xl' | 'l' | 'm' | 's';
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  marginBottom?: Spacing;
};

/**
 * Use headings to structure content on pages.
 *
 * @see https://design-system.service.gov.uk/styles/headings/
 */
export function Heading({
  size,
  headingLevel = 2,
  marginBottom,
  className,
  ...props
}: HeadingProps) {
  const Element = `h${headingLevel}` as const;
  return (
    <Element
      className={clsx(`govuk-heading-${size}`, overrideClasses({ marginBottom }), className)}
      {...props}
    />
  );
}
