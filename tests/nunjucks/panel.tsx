import { Button, ButtonGroup, Panel } from '../../src';
import { attributes, className, content, html, optional, type Options } from './helpers';

type Action = {
  text?: string;
  href?: string;
  type?: string;
  classes?: string;
  attributes?: unknown;
};

export function action(item: Action, index: number) {
  if (!item.href || item.type === 'button') {
    return (
      <Button
        key={index}
        variant="inverse"
        type={(item.type as 'button' | 'submit' | undefined) ?? 'button'}
        {...optional('href', item.href)}
        className={item.classes}
        {...attributes(item.attributes)}
      >
        {item.text}
      </Button>
    );
  }
  return (
    <a
      key={index}
      className={['govuk-link govuk-link--inverse', item.classes].filter(Boolean).join(' ')}
      href={item.href}
      {...attributes(item.attributes)}
    >
      {item.text}
    </a>
  );
}

export default function panel(options: Options) {
  const interruption = String(options.classes ?? '').includes('govuk-panel--interruption');
  const actions = options.actions as (Options & { items?: Action[] }) | undefined;
  const body = content(options);

  return (
    <Panel.Root
      {...optional('variant', interruption ? 'interruption' : undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      <Panel.Title {...optional('headingLevel', options.headingLevel as 1 | undefined)}>
        {options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
      </Panel.Title>
      {body !== undefined && <Panel.Body>{body}</Panel.Body>}
      {interruption && actions && (
        <Panel.Actions className={className(actions)} {...attributes(actions.attributes)}>
          {actions.items?.length ? (
            <ButtonGroup>
              {actions.items.flatMap((item, i) => (i ? [' ', action(item, i)] : [action(item, i)]))}
            </ButtonGroup>
          ) : null}
        </Panel.Actions>
      )}
    </Panel.Root>
  );
}
