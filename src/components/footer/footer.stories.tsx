import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/footer/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/footer';
import * as Footer from '.';

export default { title: 'Footer', component: Footer.Composite } satisfies Meta<
  typeof Footer.Composite
>;

export const Default = {
  render: () => <Footer.Composite />,
};

export const WithMeta = {
  render: () => (
    <Footer.Composite
      metaLinks={
        <>
          <Footer.InlineListItem>
            <Footer.Link href="#">Item 1</Footer.Link>
          </Footer.InlineListItem>
          <Footer.InlineListItem>
            <Footer.Link href="#">Item 2</Footer.Link>
          </Footer.InlineListItem>
          <Footer.InlineListItem>
            <Footer.Link href="#">Item 3</Footer.Link>
          </Footer.InlineListItem>
        </>
      }
    />
  ),
};

export const WithParts = {
  render: () => (
    <Footer.Root>
      <Footer.WidthContainer>
        <Footer.Crown />
        <Footer.Meta>
          <Footer.MetaItem grow>
            <Footer.MetaHeading />
            <Footer.InlineList>
              <Footer.InlineListItem>
                <Footer.Link href="#">Item 1</Footer.Link>
              </Footer.InlineListItem>
            </Footer.InlineList>
            <Footer.LicenceLogo /> <Footer.LicenceDescriptionComposite />
          </Footer.MetaItem>
          <Footer.MetaItem>
            <Footer.CopyrightLogo />
          </Footer.MetaItem>
        </Footer.Meta>
      </Footer.WidthContainer>
    </Footer.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
