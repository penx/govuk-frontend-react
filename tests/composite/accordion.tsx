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
      <Accordion.Root
        id={id}
        {...Object.assign(
          {},
          ...texts.map((key) => optional(key, (options[key] as string) || undefined)),
        )}
        {...optional('rememberExpanded', options.rememberExpanded as boolean)}
        className={className(options)}
        {...attributes(options.attributes)}
      >
        {items.map((item, index) =>
          item ? (
            <Accordion.SectionComposite
              key={index}
              accordionId={id}
              index={index + 1}
              expanded={item.expanded}
              {...optional('headingLevel', (options.headingLevel as 2) || undefined)}
              heading={content(item.heading)}
              summary={content(item.summary)}
            >
              {item.content?.html ? (
                content(item.content)
              ) : item.content?.text ? (
                <Body>{String(item.content.text)}</Body>
              ) : null}
            </Accordion.SectionComposite>
          ) : null,
        )}
      </Accordion.Root>
    );
  },
} satisfies CompositeMapping;
