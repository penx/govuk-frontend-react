import type { ComponentProps, ElementType, ReactNode } from 'react';
import { classNameLookup, cx, type ClassNames } from '../../utils/class-names';

export type ClassName =
  | 'govuk-button'
  | 'govuk-button--secondary'
  | 'govuk-button--warning'
  | 'govuk-button--inverse'
  | 'govuk-button--start'
  | 'govuk-button__start-icon';

export type Variant = 'secondary' | 'warning' | 'inverse';

type OwnProps<As extends ElementType> = {
  as?: As;
  children?: ReactNode;
  className?: string;
  classNames?: ClassNames<ClassName>;
  href?: string;
  variant?: Variant;
  start?: boolean;
  preventDoubleClick?: boolean;
};

export type RootProps<As extends ElementType = 'button'> = OwnProps<As> &
  Omit<ComponentProps<As>, keyof OwnProps<As>>;

export type LinkProps = Omit<OwnProps<'a'>, 'as' | 'href'> &
  Omit<ComponentProps<'a'>, keyof OwnProps<'a'>> & { as?: undefined; href: string };

export type StartIconProps = ComponentProps<'svg'> & {
  classNames?: ClassNames<ClassName>;
};

export function StartIcon({ className, classNames, ...props }: StartIconProps) {
  const cn = classNameLookup(classNames);
  return (
    <svg
      className={cx(cn('govuk-button__start-icon'), className)}
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

export function Root(props: LinkProps): ReactNode;
export function Root<As extends ElementType = 'button'>(props: RootProps<As>): ReactNode;
export function Root({
  as,
  children,
  className,
  classNames,
  variant,
  start,
  preventDoubleClick,
  href,
  type,
  name,
  value,
  disabled,
  ...rest
}: RootProps<ElementType>) {
  const cn = classNameLookup(classNames);
  const Element: ElementType = as ?? (href ? 'a' : 'button');
  const isButton = Element === 'button';

  const content =
    start &&
    children !== undefined &&
    typeof children !== 'string' &&
    typeof children !== 'number' ? (
      <span>{children}</span>
    ) : (
      children
    );

  const elementProps = isButton
    ? {
        type: type || 'submit',
        name: name || undefined,
        value: value || undefined,
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
      className={cx(
        cn('govuk-button', variant && `govuk-button--${variant}`, start && 'govuk-button--start'),
        className,
      )}
      data-module="govuk-button"
      {...rest}
    >
      {content}
      {start && ' '}
      {start && <StartIcon classNames={classNames} />}
    </Element>
  );
}
