import type { ComponentProps, ReactNode } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';

export type HeadingProps = ComponentProps<'h1'>;

export function Heading({ className, children, ...props }: HeadingProps) {
  return (
    <h1 className={clsx('govuk-fieldset__heading', className)} {...props}>
      {children}
    </h1>
  );
}

export type LegendProps = ComponentProps<'legend'> & {
  size?: 's' | 'm' | 'l' | 'xl';
};

export function Legend({ className, size, children, ...props }: LegendProps) {
  return (
    <legend
      className={clsx(
        'govuk-fieldset__legend',
        size && `govuk-fieldset__legend--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </legend>
  );
}

export type LegendCompositeProps = LegendProps & {
  /** Whether the legend also acts as the heading for the page. */
  isPageHeading?: boolean;
};

export function LegendComposite({ isPageHeading, children, ...props }: LegendCompositeProps) {
  if (!hasContent(children)) return null;
  return <Legend {...props}>{isPageHeading ? <Heading>{children}</Heading> : children}</Legend>;
}

export type RootProps = ComponentProps<'fieldset'>;

/**
 * Use the fieldset component to group related form inputs.
 *
 * @see https://design-system.service.gov.uk/components/fieldset/
 */
export function Root({ className, ...props }: RootProps) {
  return <fieldset className={clsx('govuk-fieldset', className)} {...props} />;
}

export type CompositeProps = RootProps & {
  /** The legend for the fieldset component. */
  legend?: ReactNode;
  legendSize?: LegendProps['size'];
  /** Whether the legend also acts as the heading for the page. */
  legendIsPageHeading?: boolean;
};

/**
 * Use the fieldset component to group related form inputs.
 *
 * @see https://design-system.service.gov.uk/components/fieldset/
 */
export function Composite({
  legend,
  legendSize,
  legendIsPageHeading,
  children,
  ...props
}: CompositeProps) {
  return (
    <Root {...props}>
      <LegendComposite size={legendSize} isPageHeading={legendIsPageHeading}>
        {legend}
      </LegendComposite>
      {children}
    </Root>
  );
}
