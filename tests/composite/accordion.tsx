import { Accordion, Body } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import { contentOf, type CompositeMapping } from './helpers';

type Item = { heading?: Options; summary?: Options; content?: Options; expanded?: boolean };

const texts = [
  'hideAllSectionsText',
  'hideSectionText',
  'hideSectionAriaLabelText',
  'showAllSectionsText',
  'showSectionText',
  'showSectionAriaLabelText',
];

export default {
  supports: [
    'id',
    'headingLevel',
    'rememberExpanded',
    'classes',
    'attributes',
    ...texts,
    'items.*.expanded',
    ...contentOf('items.*.heading', 'items.*.summary', 'items.*.content'),
  ],
  render: (options) => {
    const id = options.id as string;
    const items = (options.items as (Item | null)[] | undefined) ?? [];
    return (
      <Accordion.Composite
        id={id}
        {...Object.assign(
          {},
          ...texts.map((key) => optional(key, (options[key] as string) || undefined)),
        )}
        {...optional('rememberExpanded', options.rememberExpanded as boolean)}
        {...optional('headingLevel', (options.headingLevel as 2) || undefined)}
        className={className(options)}
        {...attributes(options.attributes)}
        sections={items
          .filter((item) => item !== null)
          .map((item) => ({
            expanded: item.expanded,
            heading: content(item.heading),
            summary: content(item.summary),
            children: item.content?.html ? (
              content(item.content)
            ) : item.content?.text ? (
              <Body>{String(item.content.text)}</Body>
            ) : null,
          }))}
      />
    );
  },
} satisfies CompositeMapping;
