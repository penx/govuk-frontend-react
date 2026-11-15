import { Tag, TaskList } from '../../src';
import { attributes, className, content, type Options } from './helpers';

type Item = Options & {
  href?: string;
  title?: Options;
  hint?: Options;
  status?: Options & { tag?: Options };
};

export default function taskList(options: Options) {
  const idPrefix = (options.idPrefix as string) || 'task-list';
  const items = (options.items as (Item | null)[] | undefined) ?? [];
  return (
    <TaskList.Root className={className(options)} {...attributes(options.attributes)}>
      {items.map((item, index) => {
        if (!item) return null;
        const hintId = `${idPrefix}-${index + 1}-hint`;
        const statusId = `${idPrefix}-${index + 1}-status`;
        const tag = item.status?.tag;
        return (
          <TaskList.Item key={index} withLink={Boolean(item.href)} className={className(item)}>
            <TaskList.NameAndHint>
              {item.href ? (
                <TaskList.Link
                  href={item.href}
                  aria-describedby={item.hint ? `${hintId} ${statusId}` : statusId}
                  className={className(item.title)}
                >
                  {content(item.title)}
                </TaskList.Link>
              ) : (
                <div className={className(item.title)}>{content(item.title)}</div>
              )}
              {item.hint ? <TaskList.Hint id={hintId}>{content(item.hint)}</TaskList.Hint> : null}
            </TaskList.NameAndHint>
            <TaskList.Status id={statusId} className={className(item.status)}>
              {tag ? (
                <Tag className={className(tag)} {...attributes(tag.attributes)}>
                  {content(tag)}
                </Tag>
              ) : (
                content(item.status)
              )}
            </TaskList.Status>
          </TaskList.Item>
        );
      })}
    </TaskList.Root>
  );
}
