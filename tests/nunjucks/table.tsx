import { Table } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

type Format = 'numeric';

const spans = (item: Options) => ({
  ...optional('colSpan', item.colspan as number | undefined),
  ...optional('rowSpan', item.rowspan as number | undefined),
});

export default function table(options: Options) {
  const head = options.head as Options[] | undefined;
  const rows = (options.rows as (Options[] | null | false)[] | undefined) ?? [];
  return (
    <Table.Root className={className(options)} {...attributes(options.attributes)}>
      {options.caption ? (
        <Table.Caption {...optional('className', options.captionClasses as string | undefined)}>
          {String(options.caption)}
        </Table.Caption>
      ) : null}
      {head ? (
        <Table.Head>
          <Table.Row>
            {head.map((item, index) => (
              <Table.Header
                key={index}
                scope="col"
                {...optional('format', item.format as Format | undefined)}
                className={className(item)}
                {...spans(item)}
                {...attributes(item.attributes)}
              >
                {content(item)}
              </Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
      ) : null}
      <Table.Body>
        {rows.map((row, rowIndex) =>
          row ? (
            <Table.Row key={rowIndex}>
              {row.map((cell, index) =>
                index === 0 && options.firstCellIsHeader ? (
                  <Table.Header
                    key={index}
                    scope="row"
                    className={className(cell)}
                    {...spans(cell)}
                    {...attributes(cell.attributes)}
                  >
                    {content(cell)}
                  </Table.Header>
                ) : (
                  <Table.Cell
                    key={index}
                    {...optional('format', cell.format as Format | undefined)}
                    className={className(cell)}
                    {...spans(cell)}
                    {...attributes(cell.attributes)}
                  >
                    {content(cell)}
                  </Table.Cell>
                ),
              )}
            </Table.Row>
          ) : null,
        )}
      </Table.Body>
    </Table.Root>
  );
}
