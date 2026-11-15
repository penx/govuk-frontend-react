import { Breadcrumbs } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

export default function breadcrumbs(options: Options) {
  const items = (options.items as Options[] | undefined) ?? [];
  return (
    <Breadcrumbs.Root
      className={className(options)}
      collapseOnMobile={Boolean(options.collapseOnMobile)}
      {...optional('aria-label', options.labelText as string | undefined)}
      {...attributes(options.attributes)}
    >
      <Breadcrumbs.List>
        {items.map((item, index) =>
          item.href ? (
            <Breadcrumbs.Item key={index}>
              <Breadcrumbs.Link href={String(item.href)} {...attributes(item.attributes)}>
                {content(item)}
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          ) : (
            <Breadcrumbs.Item key={index} aria-current="page">
              {content(item)}
            </Breadcrumbs.Item>
          ),
        )}
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  );
}
