import type { ReactNode } from 'react';
import { SummaryList } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

type Actions = { items?: Options[]; classes?: string };
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

function action(item: Options, cardTitle: Options | undefined) {
  const hidden: ReactNode[] = [];
  if (item.visuallyHiddenText) hidden.push(String(item.visuallyHiddenText));
  if (cardTitle) {
    if (hidden.length) hidden.push(' ');
    hidden.push('(', content(cardTitle), ')');
  }
  return (
    <SummaryList.Action
      href={String(item.href ?? '')}
      className={className(item)}
      visuallyHiddenText={hidden.length ? <>{hidden}</> : undefined}
      {...attributes(item.attributes)}
    >
      {content(item)}
    </SummaryList.Action>
  );
}

function list(options: Options) {
  const rows = (options.rows as (Options | null | false | '')[] | undefined) ?? [];
  const card = options.card as Options | undefined;
  const cardTitle = card?.title as Options | undefined;
  const anyRowHasActions = rows.some((row) => row && (row.actions as Actions)?.items?.length);
  return (
    <SummaryList.Root className={className(options)} {...attributes(options.attributes)}>
      {rows.map((row, index) => {
        if (!row) return null;
        const actions = row.actions as Actions | undefined;
        const items = actions?.items ?? [];
        return (
          <SummaryList.Row
            key={index}
            noActions={anyRowHasActions && !actions?.items}
            className={className(row)}
          >
            <SummaryList.Key className={className(row.key as Options)}>
              {content(row.key as Options)}
            </SummaryList.Key>
            <SummaryList.Value className={className(row.value as Options)}>
              {content(row.value as Options)}
            </SummaryList.Value>
            {items.length ? (
              <SummaryList.Actions {...optional('className', actions?.classes)}>
                {items.length === 1 ? (
                  action(items[0] as Options, cardTitle)
                ) : (
                  <SummaryList.ActionsList>
                    {items.map((item, i) => (
                      <SummaryList.ActionsListItem key={i}>
                        {action(item, cardTitle)}
                      </SummaryList.ActionsListItem>
                    ))}
                  </SummaryList.ActionsList>
                )}
              </SummaryList.Actions>
            ) : null}
          </SummaryList.Row>
        );
      })}
    </SummaryList.Root>
  );
}

export default function summaryList(options: Options) {
  const card = options.card as Options | undefined;
  if (!card) return list(options);
  const title = card.title as Options | undefined;
  const actions = card.actions as Actions | undefined;
  const items = actions?.items ?? [];
  return (
    <SummaryList.Card.Root className={className(card)} {...attributes(card.attributes)}>
      <SummaryList.Card.TitleWrapper>
        {title ? (
          <SummaryList.Card.Title
            {...optional('headingLevel', title.headingLevel as HeadingLevel | undefined)}
            className={className(title)}
          >
            {content(title)}
          </SummaryList.Card.Title>
        ) : null}
        {items.length === 1 ? (
          <SummaryList.Card.Actions {...optional('className', actions?.classes)}>
            {action(items[0] as Options, title)}
          </SummaryList.Card.Actions>
        ) : items.length ? (
          <SummaryList.Card.Actions as="ul" {...optional('className', actions?.classes)}>
            {items.map((item, i) => (
              <SummaryList.Card.Action key={i}>{action(item, title)}</SummaryList.Card.Action>
            ))}
          </SummaryList.Card.Actions>
        ) : null}
      </SummaryList.Card.TitleWrapper>
      <SummaryList.Card.Content>{list(options)}</SummaryList.Card.Content>
    </SummaryList.Card.Root>
  );
}
