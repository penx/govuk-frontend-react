import { Fragment } from 'react';
import { Body, Button, CookieBanner, Link } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

type Action = Options & {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  value?: string;
};
export type Message = Options & { role?: string; hidden?: boolean; actions?: Action[] };

export function actions(message: Message) {
  return message.actions?.map((action, i) => (
    <Fragment key={i}>
      {i > 0 ? ' ' : null}
      {!action.href || action.type === 'button' ? (
        <Button.Root
          {...optional('href', action.href)}
          type={action.type || 'button'}
          {...optional('name', action.name)}
          {...optional('value', action.value)}
          className={className(action)}
          {...attributes(action.attributes)}
        >
          {action.text as string}
        </Button.Root>
      ) : (
        <Link className={className(action)} href={action.href} {...attributes(action.attributes)}>
          {action.text as string}
        </Link>
      )}
    </Fragment>
  ));
}

export function body(message: Message) {
  return message.html ? (
    html(message.html)
  ) : message.text ? (
    <Body>{String(message.text)}</Body>
  ) : null;
}

export const heading = (message: Message) =>
  message.headingHtml ? html(message.headingHtml) : (message.headingText as string | undefined);

export default function cookieBanner(options: Options) {
  const messages = (options.messages as Message[] | undefined) ?? [];
  return (
    <CookieBanner.Root
      {...optional('aria-label', (options.ariaLabel as string) || undefined)}
      hidden={Boolean(options.hidden)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {messages.map((message, index) => (
        <CookieBanner.Message
          key={index}
          className={className(message)}
          {...optional('role', message.role)}
          {...attributes(message.attributes)}
          hidden={Boolean(message.hidden)}
        >
          <CookieBanner.GridRow>
            <CookieBanner.GridColumn>
              {heading(message) ? (
                <CookieBanner.Heading>{heading(message)}</CookieBanner.Heading>
              ) : null}
              <CookieBanner.Content>{body(message)}</CookieBanner.Content>
            </CookieBanner.GridColumn>
          </CookieBanner.GridRow>
          {message.actions?.length ? (
            <CookieBanner.ButtonGroup>{actions(message)}</CookieBanner.ButtonGroup>
          ) : null}
        </CookieBanner.Message>
      ))}
    </CookieBanner.Root>
  );
}
