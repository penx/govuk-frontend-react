import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { i18nAttributes } from '../../utils/i18n';
import { VisuallyHidden } from '../../utilities/visually-hidden';
import { Root as BaseButton, type LinkProps } from '../button';

export type RootProps = ComponentProps<'div'> & {
  activatedText?: string;
  timedOutText?: string;
  pressTwoMoreTimesText?: string;
  pressOneMoreTimeText?: string;
};

export function Root({
  activatedText,
  timedOutText,
  pressTwoMoreTimesText,
  pressOneMoreTimeText,
  className,
  ...props
}: RootProps) {
  return (
    <div
      className={clsx('govuk-exit-this-page', className)}
      data-module="govuk-exit-this-page"
      {...i18nAttributes('activated', activatedText)}
      {...i18nAttributes('timed-out', timedOutText)}
      {...i18nAttributes('press-two-more-times', pressTwoMoreTimesText)}
      {...i18nAttributes('press-one-more-time', pressOneMoreTimeText)}
      {...props}
    />
  );
}

export type ButtonProps = Omit<LinkProps, 'href' | 'variant'> & { href?: string };

export function Button({ href, className, ...props }: ButtonProps) {
  return (
    <BaseButton
      href={href || 'https://www.bbc.co.uk/weather'}
      variant="warning"
      className={clsx('govuk-exit-this-page__button', 'govuk-js-exit-this-page-button', className)}
      rel="nofollow noreferrer"
      {...props}
    />
  );
}

export type CompositeProps = RootProps & Pick<ButtonProps, 'href'>;

export function Composite({ href, children, ...props }: CompositeProps) {
  return (
    <Root {...props}>
      <Button href={href}>
        {hasContent(children) ? (
          children
        ) : (
          <>
            <VisuallyHidden>Emergency</VisuallyHidden> Exit this page
          </>
        )}
      </Button>
    </Root>
  );
}
