import type { ComponentProps } from 'react';
import { classNameLookup, cx, type ClassNames } from '../../utils/class-names';

export type HintClassName = 'govuk-hint';

export type HintProps = ComponentProps<'div'> & {
  classNames?: ClassNames<HintClassName>;
};

export function Hint({ className, classNames, ...props }: HintProps) {
  const cn = classNameLookup(classNames);
  return <div className={cx(cn('govuk-hint'), className)} {...props} />;
}
