import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { i18nAttributes } from '../../utils/i18n';
import { VisuallyHidden } from '../../utilities/visually-hidden';
import { Root as BaseButton, type LinkProps } from '../button';

export type RootProps = ComponentProps<'div'> & {
  /** Text announced by screen readers when Exit this Page has been activated via the keyboard shortcut. Defaults to `"Loading."`. */
  activatedText?: string;
  /** Text announced by screen readers when the keyboard shortcut has timed out without successful activation. Defaults to `"Exit this page expired."`. */
  timedOutText?: string;
  /** Text announced by screen readers when the user must press <kbd>Shift</kbd> two more times to activate the button. Defaults to `"Shift, press 2 more times to exit."`. */
  pressTwoMoreTimesText?: string;
  /** Text announced by screen readers when the user must press <kbd>Shift</kbd> one more time to activate the button. Defaults to `"Shift, press 1 more time to exit."`. */
  pressOneMoreTimeText?: string;
};

/**
 * Give users a way to quickly and safely exit a service, website or application.
 *
 * @see https://design-system.service.gov.uk/components/exit-this-page/
 */
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

/**
 * Give users a way to quickly and safely exit a service, website or application.
 *
 * @see https://design-system.service.gov.uk/components/exit-this-page/
 */
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
