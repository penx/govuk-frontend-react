import { Children, type ComponentProps, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { Slot } from '../../utils/slot';
import { hasContent } from '../../utils/has-content';
import { WidthContainer as BaseWidthContainer } from '../../objects/width-container';

const defaultNavigationId = 'navigation';

export type RootProps = ComponentProps<'section'> & {
  as?: 'div' | 'section';
  inverse?: boolean;
};

/**
 * Service navigation helps users understand that they’re using your service and lets them navigate around your service.
 *
 * @see https://design-system.service.gov.uk/components/service-navigation/
 */
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

export type ContainerProps = ComponentProps<'div'>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={clsx('govuk-service-navigation__container', className)} {...props} />;
}

export type ServiceNameProps = ComponentProps<'span'>;

export function ServiceName({ className, ...props }: ServiceNameProps) {
  return <span className={clsx('govuk-service-navigation__service-name', className)} {...props} />;
}

export type LinkProps = ComponentProps<'a'> & {
  /** Render the only child (such as a router's link) instead of an `a`, with the link classes merged onto it. */
  asChild?: boolean;
};

export function Link({ className, asChild, children, ...props }: LinkProps) {
  const Element = asChild ? Slot : 'a';
  return (
    <Element className={clsx('govuk-service-navigation__link', className)} {...props}>
      {children}
    </Element>
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

export type ItemCompositeProps = Omit<ItemProps, 'children'> & {
  /** URL of the navigation item anchor. */
  href?: string;
  /** If `true`, indicates that the user is within this group of pages in the navigation hierarchy. */
  active?: boolean;
  /** If `true`, indicates that the user is currently on this page. This takes precedence over `active`. */
  current?: boolean;
  children?: ReactNode;
};

export function ItemComposite({ href, active, current, children, ...props }: ItemCompositeProps) {
  const isActive = Boolean(active || current);
  const ariaCurrent = isActive
    ? { 'aria-current': current ? ('page' as const) : ('true' as const) }
    : {};
  const text = isActive ? <ActiveFallback>{children}</ActiveFallback> : children;
  return (
    <Item active={isActive} {...props}>
      {href ? (
        <Link href={href} {...ariaCurrent}>
          {text}
        </Link>
      ) : (
        hasContent(children) && <Text {...ariaCurrent}>{text}</Text>
      )}
    </Item>
  );
}

export type CompositeProps = Omit<RootProps, 'children'> & {
  /** The name of your service. */
  serviceName?: ReactNode;
  /** The homepage of your service. */
  serviceHref?: string;
  /** The screen reader label for the mobile navigation menu. Defaults to the same value as `menuButtonText` if not specified. */
  navigationLabel?: string;
  /** The text of the mobile navigation menu toggle. */
  menuButtonText?: string;
  /** Whether the navigation should be collapsed inside a menu on mobile. Defaults to true if there is more than one navigation item. */
  collapseNavigationOnMobile?: boolean;
} & (
    | { children?: ReactNode; items?: never }
    | {
        children?: never;
        /** Prefer children, which memoise and re-render better. */
        items: ItemCompositeProps[];
      }
  );

/**
 * Service navigation helps users understand that they’re using your service and lets them navigate around your service.
 *
 * Children are `ItemComposite`s.
 *
 * @see https://design-system.service.gov.uk/components/service-navigation/
 */
export function Composite({
  serviceName,
  serviceHref,
  navigationLabel,
  menuButtonText,
  collapseNavigationOnMobile,
  as,
  items,
  children,
  ...props
}: CompositeProps) {
  const list = items
    ? items.map((item, index) => <ItemComposite key={index} {...item} />)
    : Children.toArray(children);
  const collapse = collapseNavigationOnMobile ?? list.length > 1;
  return (
    <Root as={as ?? (hasContent(serviceName) ? 'section' : 'div')} {...props}>
      <WidthContainer>
        <Container>
          {hasContent(serviceName) && (
            <ServiceName>
              {serviceHref ? (
                <Link href={serviceHref}>{serviceName}</Link>
              ) : (
                <Text>{serviceName}</Text>
              )}
            </ServiceName>
          )}
          {list.length > 0 && (
            <Wrapper aria-label={navigationLabel || menuButtonText || 'Menu'}>
              {collapse && <Toggle>{menuButtonText}</Toggle>}
              <List>{list}</List>
            </Wrapper>
          )}
        </Container>
      </WidthContainer>
    </Root>
  );
}
