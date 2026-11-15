import { Footer } from '../../src';
import { attributes, className, content, optional, type Options } from '../nunjucks/helpers';
import { contentOf, type CompositeMapping } from './helpers';

type Item = { href?: string; text?: string };
type Nav = {
  title?: string;
  width?: Footer.SectionProps['width'];
  columns?: Footer.ListProps['columns'];
  items?: Item[];
};
type Meta = Options & { items?: Item[]; visuallyHiddenTitle?: string };

export default {
  supports: [
    'classes',
    'attributes',
    'containerClasses',
    ...['title', 'width', 'columns', 'items.*.href', 'items.*.text'].map(
      (k) => `navigation.*.${k}`,
    ),
    'meta.visuallyHiddenTitle',
    'meta.items.*.href',
    'meta.items.*.text',
    ...contentOf('meta', 'contentLicence', 'copyright'),
  ],
  render: (options) => {
    const navigation = (options.navigation as Nav[] | undefined) ?? [];
    const meta = options.meta as Meta | undefined;
    if (meta && !meta.visuallyHiddenTitle && !meta.items?.length && !content(meta)) return null;
    const contentLicence = options.contentLicence as Options | null | undefined;
    return (
      <Footer.Composite
        {...optional('containerClassName', options.containerClasses as string)}
        navigation={
          navigation.length
            ? navigation.map((nav, index) => (
                <Footer.Section key={index} {...optional('width', nav.width || undefined)}>
                  <Footer.Heading>{nav.title}</Footer.Heading>
                  {nav.items?.length ? (
                    <Footer.List {...optional('columns', nav.columns)}>
                      {nav.items.map((item, i) =>
                        item.href && item.text ? (
                          <Footer.ListItem key={i}>
                            <Footer.Link href={item.href}>{item.text}</Footer.Link>
                          </Footer.ListItem>
                        ) : null,
                      )}
                    </Footer.List>
                  ) : null}
                </Footer.Section>
              ))
            : undefined
        }
        metaHeading={meta?.visuallyHiddenTitle}
        metaLinks={meta?.items?.map((item, i) => (
          <Footer.InlineListItem key={i}>
            <Footer.Link href={item.href}>{item.text}</Footer.Link>
          </Footer.InlineListItem>
        ))}
        metaContent={content(meta)}
        licence={contentLicence === null ? false : content(contentLicence)}
        copyright={content(options.copyright as Options | undefined)}
        className={className(options)}
        {...attributes(options.attributes)}
      />
    );
  },
} satisfies CompositeMapping;
