import type { ComponentProps, ElementType } from 'react';
import { clsx } from 'clsx';

export type MainWrapperProps = ComponentProps<'main'> & {
  as?: ElementType;
  size?: 'l';
  /** Adds spacing when the main wrapper is the only thing in the width container. */
  autoSpacing?: boolean;
};

export function MainWrapper({
  as: Element = 'main',
  size,
  autoSpacing,
  id = 'main-content',
  className,
  ...props
}: MainWrapperProps) {
  return (
    <Element
      className={clsx(
        'govuk-main-wrapper',
        size && `govuk-main-wrapper--${size}`,
        autoSpacing && 'govuk-main-wrapper--auto-spacing',
        className,
      )}
      id={id}
      {...props}
    />
  );
}
