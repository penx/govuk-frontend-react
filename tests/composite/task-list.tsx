import { Tag, TaskList } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import { contentOf, type CompositeMapping } from './helpers';

const cannotStartYet = 'govuk-task-list__status--cannot-start-yet';

export default {
  supports: [
    'idPrefix',
    'classes',
    'attributes',
    'items.*.href',
    'items.*.status.classes',
    'items.*.status.tag',
    ...contentOf('items.*.title', 'items.*.hint', 'items.*.status'),
  ],
  render: (options) => {
    const items = (options.items as (Options | null)[] | undefined) ?? [];
    if (
      items.some((item) => {
        const classes = (item?.status as Options | undefined)?.classes;
        return classes && classes !== cannotStartYet;
      })
    )
      return null;
    if (items.includes(null)) return null;
    return (
      <TaskList.Composite
        {...optional('idPrefix', (options.idPrefix as string) || undefined)}
        className={className(options)}
        {...attributes(options.attributes)}
        items={(items as Options[]).map((item) => {
          const status = item.status as (Options & { tag?: Options }) | undefined;
          return {
            href: item.href as string | undefined,
            title: content(item.title as Options),
            hint: content(item.hint as Options | undefined),
            cannotStartYet: status?.classes === cannotStartYet,
            status: status?.tag ? (
              <Tag className={className(status.tag)} {...attributes(status.tag.attributes)}>
                {content(status.tag)}
              </Tag>
            ) : (
              content(status)
            ),
          };
        })}
      />
    );
  },
} satisfies CompositeMapping;
