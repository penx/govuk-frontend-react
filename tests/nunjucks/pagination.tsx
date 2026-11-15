import { Pagination, VisuallyHidden } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

type Link = Options & { href?: string; labelText?: string };
type Item = {
  number?: string | number;
  href?: string;
  current?: boolean;
  ellipsis?: boolean;
  visuallyHiddenText?: string;
  attributes?: unknown;
};

function title(link: Link) {
  return link.html ? html(link.html) : link.text ? String(link.text) : undefined;
}

function label(link: Link, block: boolean) {
  return link.labelText && block ? (
    <>
      {' '}
      <VisuallyHidden>:</VisuallyHidden>{' '}
      <Pagination.LinkLabel>{link.labelText}</Pagination.LinkLabel>
    </>
  ) : null;
}

export default function pagination(options: Options) {
  const items = options.items as (Item | null)[] | undefined;
  const previous = options.previous as Link | undefined;
  const next = options.next as Link | undefined;
  const block = !items && Boolean(next || previous);
  return (
    <Pagination.Root
      block={block}
      {...optional('aria-label', (options.landmarkLabel as string) || undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {previous?.href ? (
        <Pagination.Previous>
          <Pagination.PreviousLink href={previous.href} {...attributes(previous.attributes)}>
            <Pagination.PreviousIcon />{' '}
            <Pagination.LinkTitle decorated={block && !previous.labelText}>
              {title(previous) ?? (
                <>
                  Previous<VisuallyHidden> page</VisuallyHidden>
                </>
              )}
            </Pagination.LinkTitle>
            {label(previous, block)}
          </Pagination.PreviousLink>
        </Pagination.Previous>
      ) : null}
      {items ? (
        <Pagination.List>
          {items.map((item, index) =>
            item && Object.keys(item).length ? (
              <Pagination.Item key={index} current={item.current} ellipsis={item.ellipsis}>
                {item.ellipsis ? null : (
                  <Pagination.ItemLink
                    href={item.href}
                    {...optional('aria-label', item.visuallyHiddenText)}
                    {...optional('aria-current', item.current ? ('page' as const) : undefined)}
                    {...attributes(item.attributes)}
                  >
                    {item.number}
                  </Pagination.ItemLink>
                )}
              </Pagination.Item>
            ) : null,
          )}
        </Pagination.List>
      ) : null}
      {next?.href ? (
        <Pagination.Next>
          <Pagination.NextLink href={next.href} {...attributes(next.attributes)}>
            {block ? (
              <>
                <Pagination.NextIcon />{' '}
              </>
            ) : null}
            <Pagination.LinkTitle decorated={block && !next.labelText}>
              {title(next) ?? (
                <>
                  Next<VisuallyHidden> page</VisuallyHidden>
                </>
              )}
            </Pagination.LinkTitle>
            {label(next, block)}
            {block ? null : (
              <>
                {' '}
                <Pagination.NextIcon />
              </>
            )}
          </Pagination.NextLink>
        </Pagination.Next>
      ) : null}
    </Pagination.Root>
  );
}
