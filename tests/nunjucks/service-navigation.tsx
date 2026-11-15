import { ServiceNavigation } from '../../src';
import { attributes, className, content, html, optional, type Options } from './helpers';

type Item = Options & { href?: string; active?: boolean; current?: boolean };
type EndSlot = string | { html?: string; align?: string } | undefined;
type Slots = { start?: string; end?: EndSlot; navigationStart?: string; navigationEnd?: string };

export default function serviceNavigation(options: Options) {
  const slots = (options.slots as Slots | undefined) ?? {};
  const endSlotHtml = typeof slots.end === 'string' ? slots.end : slots.end?.html;
  const endSlotInline = typeof slots.end === 'object' && slots.end.align === 'inline';
  const menuButtonText = (options.menuButtonText as string) || 'Menu';
  const navigationId = (options.navigationId as string) || undefined;
  const items = ((options.navigation as (Item | null)[] | undefined) ?? []).filter(
    (item): item is Item => Boolean(item),
  );
  const collapse = (options.collapseNavigationOnMobile as boolean | undefined) ?? items.length > 1;
  const section = Boolean(options.serviceName || slots.start || endSlotHtml);
  const serviceName = options.serviceName as string | undefined;
  const serviceUrl = options.serviceUrl as string | undefined;
  const menuButtonLabel = options.menuButtonLabel as string | undefined;

  return (
    <ServiceNavigation.Root
      as={section ? 'section' : 'div'}
      {...(section ? optional('aria-label', options.ariaLabel as string | undefined) : {})}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      <ServiceNavigation.WidthContainer inlineEndSlot={endSlotInline}>
        {slots.start ? html(slots.start) : null}
        <ServiceNavigation.Container>
          {serviceName ? (
            <ServiceNavigation.ServiceName>
              {serviceUrl ? (
                <ServiceNavigation.Link href={serviceUrl}>{serviceName}</ServiceNavigation.Link>
              ) : (
                <ServiceNavigation.Text>{serviceName}</ServiceNavigation.Text>
              )}
            </ServiceNavigation.ServiceName>
          ) : null}
          {items.length || slots.navigationStart || slots.navigationEnd ? (
            <ServiceNavigation.Wrapper
              aria-label={(options.navigationLabel as string) || menuButtonText}
              className={(options.navigationClasses as string) || undefined}
            >
              {collapse ? (
                <ServiceNavigation.Toggle
                  {...optional('aria-controls', navigationId)}
                  {...(menuButtonLabel && menuButtonLabel !== menuButtonText
                    ? { 'aria-label': menuButtonLabel }
                    : {})}
                >
                  {menuButtonText}
                </ServiceNavigation.Toggle>
              ) : null}
              <ServiceNavigation.List {...optional('id', navigationId)}>
                {slots.navigationStart ? html(slots.navigationStart) : null}
                {items.map((item, index) => {
                  const active = Boolean(item.active || item.current);
                  const current = active
                    ? { 'aria-current': item.current ? ('page' as const) : ('true' as const) }
                    : {};
                  const text = content(item);
                  const inner = active ? (
                    <ServiceNavigation.ActiveFallback>{text}</ServiceNavigation.ActiveFallback>
                  ) : (
                    text
                  );
                  return (
                    <ServiceNavigation.Item key={index} active={active}>
                      {item.href ? (
                        <ServiceNavigation.Link
                          href={item.href}
                          {...current}
                          {...attributes(item.attributes)}
                        >
                          {inner}
                        </ServiceNavigation.Link>
                      ) : text !== undefined ? (
                        <ServiceNavigation.Text {...current}>{inner}</ServiceNavigation.Text>
                      ) : null}
                    </ServiceNavigation.Item>
                  );
                })}
                {slots.navigationEnd ? html(slots.navigationEnd) : null}
              </ServiceNavigation.List>
            </ServiceNavigation.Wrapper>
          ) : null}
        </ServiceNavigation.Container>
        {endSlotHtml ? html(endSlotHtml) : null}
      </ServiceNavigation.WidthContainer>
    </ServiceNavigation.Root>
  );
}
