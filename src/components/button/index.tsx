import type { ComponentProps, ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

export type ButtonVariant = 'secondary' | 'warning' | 'inverse';

type OwnProps<As extends ElementType> = {
  as?: As;
  children?: ReactNode;
  className?: string;
  /** The URL that the button should link to. */
  href?: string;
  variant?: ButtonVariant;
  /** Use for the main call to action on your service's start page. */
  start?: boolean;
  /** Prevent accidental double clicks on submit buttons from submitting forms multiple times. This has no effect if `href` is set. */
  preventDoubleClick?: boolean;
};

export type ButtonProps<As extends ElementType = 'button'> = OwnProps<As> &
  Omit<ComponentProps<As>, keyof OwnProps<As>>;

export type ButtonLinkProps = Omit<OwnProps<'a'>, 'as' | 'href'> &
  Omit<ComponentProps<'a'>, keyof OwnProps<'a'>> & { as?: undefined; href: string };

export type StartButtonIconProps = ComponentProps<'svg'>;

/** The arrow on a start button. */
export function StartButtonIcon({ className, ...props }: StartButtonIconProps) {
  return (
    <svg
      className={clsx('govuk-button__start-icon', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  );
}

/**
 * Use the button component to help users carry out an action.
 *
 * @see https://design-system.service.gov.uk/components/button/
 */
export function Button(props: ButtonLinkProps): ReactNode;
export function Button<As extends ElementType = 'button'>(props: ButtonProps<As>): ReactNode;
export function Button({
  as,
  children,
  className,
  variant,
  start,
  preventDoubleClick,
  href,
  type,
  name,
  value,
  disabled,
  ...rest
}: ButtonProps<ElementType>) {
  const Element: ElementType = as ?? (href ? 'a' : 'button');
  const isButton = Element === 'button';

  const elementProps = isButton
    ? {
        type: type || 'submit',
        name,
        value,
        disabled,
        'aria-disabled': disabled ? 'true' : undefined,
        'data-prevent-double-click':
          preventDoubleClick === undefined ? undefined : String(preventDoubleClick),
      }
    : { role: 'button', draggable: 'false' };

  return (
    <Element
      {...(href ? { href } : {})}
      {...elementProps}
      className={clsx(
        'govuk-button',
        variant && `govuk-button--${variant}`,
        start && 'govuk-button--start',
        className,
      )}
      data-module="govuk-button"
      {...rest}
    >
      {children}
    </Element>
  );
}

/** Wraps a start button's content when it isn't plain text. */
export const StartButtonContent = 'span';

/**
 * Use a start button for the main call to action on your service's start page. Adds the arrow, and
 * wraps content that isn't plain text in `StartButtonContent`.
 *
 * @see https://design-system.service.gov.uk/components/button/#start-buttons
 */
export function StartButton(props: Omit<ButtonLinkProps, 'start'>): ReactNode;
export function StartButton<As extends ElementType = 'button'>(
  props: Omit<ButtonProps<As>, 'start'>,
): ReactNode;
export function StartButton({ children, ...props }: Omit<ButtonProps<ElementType>, 'start'>) {
  const text = typeof children === 'string' || typeof children === 'number';
  return (
    <Button start {...props}>
      {text || children === undefined ? (
        children
      ) : (
        <StartButtonContent>{children}</StartButtonContent>
      )}{' '}
      <StartButtonIcon />
    </Button>
  );
}
