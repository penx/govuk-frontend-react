import type { ReactNode } from 'react';
import { SummaryList } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import { contentOf, type CompositeMapping } from './helpers';

type Actions = { items?: Options[] };

function action(item: Options, cardTitle: Options | undefined, index: number) {
  const hidden: ReactNode[] = [];
  if (item.visuallyHiddenText) hidden.push(String(item.visuallyHiddenText));
  if (cardTitle) {
    if (hidden.length) hidden.push(' ');
    hidden.push('(', content(cardTitle), ')');
  }
  return (
    <SummaryList.ActionComposite
      key={index}
      href={String(item.href ?? '')}
      visuallyHiddenText={hidden.length ? <>{hidden}</> : undefined}
    >
      {content(item)}
    </SummaryList.ActionComposite>
  );
}

const actionItem = ['href', 'text', 'html', 'visuallyHiddenText'];

export default {
  supports: [
    'classes',
    'attributes',
    ...contentOf('rows.*.key', 'rows.*.value'),
    ...actionItem.map((key) => `rows.*.actions.items.*.${key}`),
    ...contentOf('card.title'),
    'card.title.headingLevel',
    ...actionItem.map((key) => `card.actions.items.*.${key}`),
  ],
  render: (options) => {
    const rows = ((options.rows as (Options | null | false | '')[] | undefined) ?? []).filter(
      Boolean,
    ) as Options[];
    const card = options.card as Options | undefined;
    const cardTitle = card?.title as Options | undefined;
    const list = (
      <SummaryList.Composite
        className={className(options)}
        {...attributes(options.attributes)}
        rows={rows.map((row) => ({
          term: content(row.key as Options),
          value: content(row.value as Options),
          actions: (row.actions as Actions | undefined)?.items?.map((item, i) =>
            action(item, cardTitle, i),
          ),
        }))}
      />
    );
    if (!card) return list;
    return (
      <SummaryList.Card.Composite
        title={content(cardTitle)}
        {...optional('headingLevel', cardTitle?.headingLevel as 2)}
        actions={(card.actions as Actions | undefined)?.items?.map((item, i) =>
          action(item, cardTitle, i),
        )}
      >
        {list}
      </SummaryList.Card.Composite>
    );
  },
} satisfies CompositeMapping;
