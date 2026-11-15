import { CookieBanner } from '../../src';
import { attributes, className, optional, type Options } from '../nunjucks/helpers';
import { actions, body, heading, type Message } from '../nunjucks/cookie-banner';
import type { CompositeMapping } from './helpers';

const message = [
  'headingText',
  'headingHtml',
  'text',
  'html',
  'role',
  'hidden',
  'classes',
  'attributes',
];
const action = ['text', 'href', 'type', 'name', 'value', 'classes', 'attributes'];

export default {
  supports: [
    'ariaLabel',
    'hidden',
    'classes',
    'attributes',
    ...message.map((key) => `messages.*.${key}`),
    ...action.map((key) => `messages.*.actions.*.${key}`),
  ],
  render: (options: Options) => {
    const messages = (options.messages as Message[] | undefined) ?? [];
    const root = {
      ...optional('aria-label', (options.ariaLabel as string) || undefined),
      hidden: Boolean(options.hidden),
      className: className(options),
      ...attributes(options.attributes),
    };
    const only = messages.length === 1 ? messages[0] : undefined;
    if (only && !only.role && !only.hidden && !only.classes && !only.attributes) {
      return (
        <CookieBanner.Composite heading={heading(only)} actions={actions(only)} {...root}>
          {body(only)}
        </CookieBanner.Composite>
      );
    }
    return (
      <CookieBanner.Root {...root}>
        {messages.map((m, index) => (
          <CookieBanner.MessageComposite
            key={index}
            className={className(m)}
            {...optional('role', m.role)}
            {...attributes(m.attributes)}
            hidden={Boolean(m.hidden)}
            heading={heading(m)}
            actions={actions(m)}
          >
            {body(m)}
          </CookieBanner.MessageComposite>
        ))}
      </CookieBanner.Root>
    );
  },
} satisfies CompositeMapping;
