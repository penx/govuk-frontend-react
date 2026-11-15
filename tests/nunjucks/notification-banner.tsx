import { NotificationBanner } from '../../src';
import { attributes, className, html, optional, type Options } from './helpers';

export default function notificationBanner(options: Options) {
  const success = options.type === 'success';
  const titleId = (options.titleId as string) || undefined;
  const title = options.titleHtml
    ? html(options.titleHtml)
    : (options.titleText as string) || (success ? 'Success' : undefined);
  return (
    <NotificationBanner.Root
      success={success}
      {...optional('role', options.role as string | undefined)}
      {...optional('aria-labelledby', titleId)}
      {...optional('disableAutoFocus', options.disableAutoFocus as boolean | undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      <NotificationBanner.Header>
        <NotificationBanner.Title
          {...optional('headingLevel', options.titleHeadingLevel as 2 | undefined)}
          {...optional('id', titleId)}
        >
          {title}
        </NotificationBanner.Title>
      </NotificationBanner.Header>
      <NotificationBanner.Content>
        {options.html ? (
          html(options.html)
        ) : options.text ? (
          <NotificationBanner.Heading>{String(options.text)}</NotificationBanner.Heading>
        ) : null}
      </NotificationBanner.Content>
    </NotificationBanner.Root>
  );
}
