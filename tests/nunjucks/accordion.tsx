import { Accordion, Body } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

type Item = { heading?: Options; summary?: Options; content?: Options; expanded?: boolean };

export default function accordion(options: Options) {
  const id = options.id as string;
  const items = (options.items as (Item | null)[] | undefined) ?? [];
  const text = (key: string) => optional(key, (options[key] as string) || undefined);
  return (
    <Accordion.Root
      id={id}
      {...text('hideAllSectionsText')}
      {...text('hideSectionText')}
      {...text('hideSectionAriaLabelText')}
      {...text('showAllSectionsText')}
      {...text('showSectionText')}
      {...text('showSectionAriaLabelText')}
      {...optional('rememberExpanded', options.rememberExpanded as boolean | undefined)}
      className={className(options)}
      {...attributes(options.attributes)}
    >
      {items.map((item, index) => {
        if (!item) return null;
        const n = index + 1;
        const summary = content(item.summary);
        return (
          <Accordion.Section key={index} expanded={item.expanded}>
            <Accordion.SectionHeader>
              <Accordion.SectionHeading
                {...optional('headingLevel', (options.headingLevel as 2) || undefined)}
              >
                <Accordion.SectionButton id={`${id}-heading-${n}`}>
                  {content(item.heading)}
                </Accordion.SectionButton>
              </Accordion.SectionHeading>
              {summary ? (
                <Accordion.SectionSummary id={`${id}-summary-${n}`}>
                  {summary}
                </Accordion.SectionSummary>
              ) : null}
            </Accordion.SectionHeader>
            <Accordion.SectionContent id={`${id}-content-${n}`}>
              {item.content?.html ? (
                content(item.content)
              ) : item.content?.text ? (
                <Body>{String(item.content.text)}</Body>
              ) : null}
            </Accordion.SectionContent>
          </Accordion.Section>
        );
      })}
    </Accordion.Root>
  );
}
