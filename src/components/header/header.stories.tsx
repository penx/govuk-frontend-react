import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/header/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/header';
import * as Header from '.';

export default { title: 'Header', component: Header.Root } satisfies Meta<typeof Header.Root>;

export const Default = {
  render: () => (
    <Header.Root>
      <Header.Container>
        <Header.Logo>
          <Header.HomepageLink href="#">
            <Header.Logotype />
          </Header.HomepageLink>
        </Header.Logo>
      </Header.Container>
    </Header.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
