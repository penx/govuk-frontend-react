import { Footer } from '../../src';
import { attributes, className, content, optional, type Options } from './helpers';

type Item = { href?: string; text?: string; attributes?: unknown };
type Nav = {
  title?: string;
  width?: Footer.SectionProps['width'];
  columns?: Footer.ListProps['columns'];
  items?: Item[];
};
type Meta = Options & { items?: Item[]; visuallyHiddenTitle?: string };

export default function footer(options: Options) {
  const navigation = (options.navigation as Nav[] | undefined) ?? [];
  const meta = options.meta as Meta | undefined;
  const contentLicence = options.contentLicence as Options | null | undefined;
  return (
    <Footer.RootComposite
      className={className(options)}
      {...optional('containerClassName', options.containerClasses as string | undefined)}
      {...attributes(options.attributes)}
    >
      {navigation.length ? (
        <>
          <Footer.Navigation>
            {navigation.map((nav, index) => (
              <Footer.Section key={index} {...optional('width', nav.width || undefined)}>
                <Footer.Heading>{nav.title}</Footer.Heading>
                {nav.items?.length ? (
                  <Footer.List {...optional('columns', nav.columns)}>
                    {nav.items.map((item, i) =>
                      item.href && item.text ? (
                        <Footer.ListItem key={i}>
                          <Footer.Link href={item.href} {...attributes(item.attributes)}>
                            {item.text}
                          </Footer.Link>
                        </Footer.ListItem>
                      ) : null,
                    )}
                  </Footer.List>
                ) : null}
              </Footer.Section>
            ))}
          </Footer.Navigation>
          <Footer.SectionBreak />
        </>
      ) : null}
      <Footer.Meta>
        <Footer.MetaItem grow>
          {meta ? (
            <>
              <Footer.MetaHeading>{meta.visuallyHiddenTitle}</Footer.MetaHeading>
              {meta.items?.length ? (
                <Footer.InlineList>
                  {meta.items.map((item, i) => (
                    <Footer.InlineListItem key={i}>
                      <Footer.Link href={item.href} {...attributes(item.attributes)}>
                        {item.text}
                      </Footer.Link>
                    </Footer.InlineListItem>
                  ))}
                </Footer.InlineList>
              ) : null}
              {meta.text || meta.html ? (
                <Footer.MetaCustom>{content(meta)}</Footer.MetaCustom>
              ) : null}
            </>
          ) : null}
          {contentLicence !== null ? (
            <>
              <Footer.LicenceLogo />{' '}
              <Footer.LicenceDescription>{content(contentLicence)}</Footer.LicenceDescription>
            </>
          ) : null}
        </Footer.MetaItem>
        <Footer.MetaItem>
          <Footer.CopyrightLogo>
            {content(options.copyright as Options | undefined)}
          </Footer.CopyrightLogo>
        </Footer.MetaItem>
      </Footer.Meta>
    </Footer.RootComposite>
  );
}
