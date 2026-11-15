import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/footer/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/footer';
import * as Footer from '.';

export default { title: 'Footer', component: Footer.Root } satisfies Meta<typeof Footer.Root>;

export const Default = {
  render: () => (
    <Footer.Root>
      <Footer.Meta>
        <Footer.MetaItem grow>
          <Footer.MetaHeading />
          <Footer.InlineList>
            <Footer.InlineListItem>
              <Footer.Link href="/help">Help</Footer.Link>
            </Footer.InlineListItem>
            <Footer.InlineListItem>
              <Footer.Link href="/cookies">Cookies</Footer.Link>
            </Footer.InlineListItem>
          </Footer.InlineList>
          <Footer.LicenceLogo /> <Footer.LicenceDescription />
        </Footer.MetaItem>
        <Footer.MetaItem>
          <Footer.CopyrightLogo />
        </Footer.MetaItem>
      </Footer.Meta>
    </Footer.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
