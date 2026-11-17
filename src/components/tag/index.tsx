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

/**
 * The Tag component indicates the status of something, such as an item on a task list or a phase banner.
 *
 * @see https://design-system.service.gov.uk/components/tag/
 */
export function Tag({ className, colour, ...props }: TagProps) {
  return (
    <strong className={clsx('govuk-tag', colour && `govuk-tag--${colour}`, className)} {...props} />
  );
}
