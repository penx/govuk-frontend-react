import { NotificationBanner } from '../../src';
import { attributes, className, html, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'type',
    'titleText',
    'titleHtml',
    'titleId',
    'titleHeadingLevel',
    'text',
    'html',
    'role',
    'disableAutoFocus',
    'classes',
    'attributes',
  ],
  render: (options) => (
    <NotificationBanner.Composite
      success={options.type === 'success'}
      title={options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
      {...optional('titleId', (options.titleId as string) || undefined)}
      {...optional('titleHeadingLevel', options.titleHeadingLevel as 2)}
      heading={options.html ? undefined : (options.text as string) || undefined}
      {...optional('role', options.role as string)}
      {...optional('disableAutoFocus', options.disableAutoFocus as boolean)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {options.html ? html(options.html) : undefined}
    </NotificationBanner.Composite>
  ),
} satisfies CompositeMapping;
