import { Body, Tabs } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

type Item = { label?: string; id?: string; attributes?: unknown; panel?: Options };

export default function tabs(options: Options) {
  const items = (options.items as (Item | null)[] | undefined) ?? [];
  const idPrefix = (options.idPrefix as string | undefined) ?? '';
  const panelId = (item: Item, index: number) => item.id || `${idPrefix}-${index + 1}`;
  return (
    <Tabs.Root
      {...optional('id', options.id as string | undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      <Tabs.Title>{options.title as string | undefined}</Tabs.Title>
      {items.length ? (
        <>
          <Tabs.List>
            {items.map((item, index) =>
              item ? (
                <Tabs.ListItem key={index} selected={index === 0}>
                  <Tabs.Tab href={`#${panelId(item, index)}`} {...attributes(item.attributes)}>
                    {item.label}
                  </Tabs.Tab>
                </Tabs.ListItem>
              ) : null,
            )}
          </Tabs.List>
          {items.map((item, index) =>
            item ? (
              <Tabs.Panel
                key={index}
                selected={index === 0}
                id={panelId(item, index)}
                {...attributes(item.panel?.attributes)}
              >
                {item.panel?.html ? (
                  html(item.panel.html)
                ) : item.panel?.text ? (
                  <Body>{String(item.panel.text)}</Body>
                ) : null}
              </Tabs.Panel>
            ) : null,
          )}
        </>
      ) : null}
    </Tabs.Root>
  );
}
