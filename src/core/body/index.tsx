import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { marginBottomClass, type Spacing } from '../../utils/overrides';

export type BodyProps = ComponentProps<'p'> & {
  size?: 'l' | 'm' | 's';
  marginBottom?: Spacing;
};

export function Body({ size, marginBottom, className, ...props }: BodyProps) {
  return (
    <p
      className={clsx(
        size ? `govuk-body-${size}` : 'govuk-body',
        marginBottomClass(marginBottom),
        className,
      )}
      {...props}
    />
  );
}
