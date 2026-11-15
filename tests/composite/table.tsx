import { Table } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

const cell = ['text', 'html', 'format', 'colspan', 'rowspan', 'classes', 'attributes'];

const spans = (item: Options) => ({
  ...optional('colSpan', item.colspan as number | undefined),
  ...optional('rowSpan', item.rowspan as number | undefined),
});

const captionSizes = {
  m: 'govuk-table__caption--m',
  l: 'govuk-table__caption--l',
  xl: 'govuk-table__caption--xl',
};

export default {
  supports: [
    'caption',
    'captionClasses',
    'firstCellIsHeader',
    'classes',
    'attributes',
    ...cell.map((key) => `head.*.${key}`),
    ...cell.map((key) => `rows.*.*.${key}`),
  ],
  render: (options) => {
    const captionSize = Object.entries(captionSizes).find(
      ([, value]) => value === options.captionClasses,
    )?.[0] as 'm' | undefined;
    if (options.captionClasses && !captionSize) return null;
    const head = options.head as Options[] | undefined;
    const rows = (options.rows as (Options[] | null | false)[] | undefined) ?? [];
    return (
      <Table.Composite
        caption={options.caption ? String(options.caption) : undefined}
        {...optional('captionSize', captionSize)}
        head={head?.map((item, index) => (
          <Table.ColumnHeader
            key={index}
            numeric={item.format === 'numeric'}
            className={className(item)}
            {...spans(item)}
            {...attributes(item.attributes)}
          >
            {content(item)}
          </Table.ColumnHeader>
        ))}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {rows.map((row, rowIndex) =>
          row ? (
            <Table.Row key={rowIndex}>
              {row.map((item, index) => {
                const Cell =
                  index === 0 && options.firstCellIsHeader ? Table.RowHeader : Table.Cell;
                return (
                  <Cell
                    key={index}
                    numeric={Cell === Table.Cell && item.format === 'numeric'}
                    className={className(item)}
                    {...spans(item)}
                    {...attributes(item.attributes)}
                  >
                    {content(item)}
                  </Cell>
                );
              })}
            </Table.Row>
          ) : null,
        )}
      </Table.Composite>
    );
  },
} satisfies CompositeMapping;
