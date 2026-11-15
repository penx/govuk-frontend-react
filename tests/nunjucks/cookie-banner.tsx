import { Fragment } from 'react';
import { Body, Button, CookieBanner, Link } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

type Action = Options & {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  value?: string;
};
type Message = Options & { role?: string; hidden?: boolean; actions?: Action[] };

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
        <CookieBanner.MessageComposite
          key={index}
          className={className(message)}
          {...optional('role', message.role)}
          {...attributes(message.attributes)}
          hidden={Boolean(message.hidden)}
          heading={
            message.headingHtml ? html(message.headingHtml) : (message.headingText as string)
          }
          actions={message.actions?.map((action, i) => (
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
                <Link
                  className={className(action)}
                  href={action.href}
                  {...attributes(action.attributes)}
                >
                  {action.text as string}
                </Link>
              )}
            </Fragment>
          ))}
        >
          {message.html ? (
            html(message.html)
          ) : message.text ? (
            <Body>{String(message.text)}</Body>
          ) : null}
        </CookieBanner.MessageComposite>
      ))}
    </CookieBanner.Root>
  );
}
