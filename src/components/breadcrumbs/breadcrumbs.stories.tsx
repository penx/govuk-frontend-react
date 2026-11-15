import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/breadcrumbs/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/breadcrumbs';
import * as Breadcrumbs from '.';

export default { title: 'Breadcrumbs', component: Breadcrumbs.Root } satisfies Meta<
  typeof Breadcrumbs.Root
>;

export const Default = {
  render: () => (
    <Breadcrumbs.Root>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/browse/abroad">
            Passports, travel and living abroad
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item aria-current="page">Travel abroad</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
