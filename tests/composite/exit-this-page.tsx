import { ExitThisPage } from '../../src';
import { attributes, className, content, optional } from '../nunjucks/helpers';
import type { CompositeMapping } from './helpers';

const texts = ['activatedText', 'timedOutText', 'pressTwoMoreTimesText', 'pressOneMoreTimeText'];

export default {
  supports: ['id', 'redirectUrl', 'text', 'html', 'classes', 'attributes', ...texts],
  render: (options) => (
    <ExitThisPage.Composite
      {...optional('id', (options.id as string) || undefined)}
      {...optional('href', (options.redirectUrl as string) || undefined)}
      {...Object.assign(
        {},
        ...texts.map((key) => optional(key, (options[key] as string) || undefined)),
      )}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {content(options)}
    </ExitThisPage.Composite>
  ),
} satisfies CompositeMapping;
