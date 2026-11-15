import type { ComponentProps } from 'react';
import { clsx } from 'clsx';

export type TagProps = ComponentProps<'strong'> & {
  colour?:
    | 'grey'
    | 'green'
    | 'teal'
    | 'blue'
    | 'light-blue'
    | 'purple'
    | 'magenta'
    | 'red'
    | 'orange'
    | 'yellow';
};

export function Tag({ className, colour, ...props }: TagProps) {
  return (
    <strong className={clsx('govuk-tag', colour && `govuk-tag--${colour}`, className)} {...props} />
  );
}
