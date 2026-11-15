import { ButtonGroup, Panel } from '../../src';
import { attributes, className, content, html, optional, type Options } from '../nunjucks/helpers';
import { action } from '../nunjucks/panel';
import type { CompositeMapping } from './helpers';

export default {
  supports: [
    'titleText',
    'titleHtml',
    'headingLevel',
    'text',
    'html',
    'classes',
    'attributes',
    'actions.items',
  ],
  render: (options) => {
    const interruption = String(options.classes ?? '').includes('govuk-panel--interruption');
    const items = (options.actions as Options | undefined)?.items as Parameters<typeof action>[0][];
    return (
      <Panel.Composite
        {...optional('variant', interruption ? 'interruption' : undefined)}
        {...optional('headingLevel', options.headingLevel as 1)}
        title={options.titleHtml ? html(options.titleHtml) : (options.titleText as string)}
        actions={
          interruption && items?.length ? (
            <ButtonGroup>
              {items.flatMap((item, i) => (i ? [' ', action(item, i)] : [action(item, i)]))}
            </ButtonGroup>
          ) : undefined
        }
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {content(options)}
      </Panel.Composite>
    );
  },
} satisfies CompositeMapping;
