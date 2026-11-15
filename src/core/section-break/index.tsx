import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type SectionBreakProps = ComponentProps<'hr'> & {
  size?: 'xl' | 'l' | 'm';
  visible?: boolean;
};

export function SectionBreak({ size, visible, className, ...props }: SectionBreakProps) {
  return (
    <hr
      className={clsx(
        'govuk-section-break',
        size && `govuk-section-break--${size}`,
        visible && 'govuk-section-break--visible',
        className,
      )}
      {...props}
    />
  );
}
