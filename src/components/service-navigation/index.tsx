import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import { hasContent } from '../../utils/has-content';
import { WidthContainer as BaseWidthContainer } from '../../objects/width-container';

const defaultNavigationId = 'navigation';

export type RootProps = ComponentProps<'section'> & {
  as?: 'div' | 'section';
  inverse?: boolean;
};

export function Root({
  as = 'div',
  inverse,
  className,
  'aria-label': ariaLabel = as === 'section' ? 'Service information' : undefined,
  ...props
}: RootProps) {
  const Element = as as 'section';
  return (
    <Element
      aria-label={ariaLabel}
      className={clsx(
        'govuk-service-navigation',
        inverse && 'govuk-service-navigation--inverse',
        className,
      )}
      data-module="govuk-service-navigation"
      {...props}
    />
  );
}

export type WidthContainerProps = ComponentProps<'div'> & { inlineEndSlot?: boolean };

export function WidthContainer({ inlineEndSlot, className, ...props }: WidthContainerProps) {
  return (
    <BaseWidthContainer
      className={clsx(inlineEndSlot && 'govuk-service-navigation__inlining-container', className)}
      {...props}
    />
  );
}

export type RootCompositeProps = RootProps & { inlineEndSlot?: boolean };

export function RootComposite({ inlineEndSlot, children, ...props }: RootCompositeProps) {
  return (
    <Root {...props}>
      <WidthContainer inlineEndSlot={inlineEndSlot}>{children}</WidthContainer>
    </Root>
  );
}

export type ContainerProps = ComponentProps<'div'>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={clsx('govuk-service-navigation__container', className)} {...props} />;
}

export type ServiceNameProps = ComponentProps<'span'>;

export function ServiceName({ className, ...props }: ServiceNameProps) {
  return <span className={clsx('govuk-service-navigation__service-name', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <a className={clsx('govuk-service-navigation__link', className)} {...props}>
      {children}
    </a>
  );
}

export type TextProps = ComponentProps<'span'>;

export function Text({ className, ...props }: TextProps) {
  return <span className={clsx('govuk-service-navigation__text', className)} {...props} />;
}

export type WrapperProps = ComponentProps<'nav'>;

export function Wrapper({ className, 'aria-label': ariaLabel = 'Menu', ...props }: WrapperProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={clsx('govuk-service-navigation__wrapper', className)}
      {...props}
    />
  );
}

export type ToggleProps = ComponentProps<'button'>;

export function Toggle({ className, children, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      className={clsx(
        'govuk-service-navigation__toggle',
        'govuk-js-service-navigation-toggle',
        className,
      )}
      aria-controls={defaultNavigationId}
      hidden
      aria-hidden="true"
      {...props}
    >
      {hasContent(children) ? children : 'Menu'}
    </button>
  );
}

export type ListProps = ComponentProps<'ul'>;

export function List({ className, ...props }: ListProps) {
  return (
    <ul
      className={clsx('govuk-service-navigation__list', className)}
      id={defaultNavigationId}
      {...props}
    />
  );
}

export type ItemProps = ComponentProps<'li'> & { active?: boolean };

export function Item({ active, className, ...props }: ItemProps) {
  return (
    <li
      className={clsx(
        'govuk-service-navigation__item',
        active && 'govuk-service-navigation__item--active',
        className,
      )}
      {...props}
    />
  );
}

export type ActiveFallbackProps = ComponentProps<'strong'>;

export function ActiveFallback({ className, ...props }: ActiveFallbackProps) {
  return (
    <strong className={clsx('govuk-service-navigation__active-fallback', className)} {...props} />
  );
}
