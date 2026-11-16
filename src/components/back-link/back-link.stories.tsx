import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/back-link/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/back-link';
import { Link as RouterLink, MemoryRouter } from 'react-router';
import { BackLink } from '.';

const meta = { title: 'Back link', component: BackLink } satisfies Meta<typeof BackLink>;

export default meta;

export const Default: StoryObj<typeof meta> = { args: { href: '/previous' } };

export const WithReactRouter: StoryObj<typeof meta> = {
  render: () => (
    <MemoryRouter>
      <BackLink asChild>
        <RouterLink to="/previous">Back</RouterLink>
      </BackLink>
    </MemoryRouter>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
