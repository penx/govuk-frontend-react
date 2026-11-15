import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/exit-this-page/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/exit-this-page';
import * as ExitThisPage from '.';

export default { title: 'Exit this page', component: ExitThisPage.Root } satisfies Meta<
  typeof ExitThisPage.Root
>;

export const Default = {
  render: () => <ExitThisPage.Composite />,
};

export const WithParts = {
  render: () => (
    <ExitThisPage.Root>
      <ExitThisPage.Button>Exit this page</ExitThisPage.Button>
    </ExitThisPage.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
