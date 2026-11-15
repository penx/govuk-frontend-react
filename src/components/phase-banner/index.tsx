import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { Tag as BaseTag, type TagProps as BaseTagProps } from '../tag';

export type RootProps = ComponentProps<'div'>;

export function Root({ className, ...props }: RootProps) {
  return (
    <div className={clsx('govuk-phase-banner', 'govuk-width-container', className)} {...props} />
  );
}

export type ContentProps = ComponentProps<'p'>;

export function Content({ className, ...props }: ContentProps) {
  return <p className={clsx('govuk-phase-banner__content', className)} {...props} />;
}

export type TagProps = BaseTagProps;

export function Tag({ className, ...props }: TagProps) {
  return <BaseTag className={clsx('govuk-phase-banner__content__tag', className)} {...props} />;
}

export type TextProps = ComponentProps<'span'>;

export function Text({ className, ...props }: TextProps) {
  return <span className={clsx('govuk-phase-banner__text', className)} {...props} />;
}
