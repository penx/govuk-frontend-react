import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/skip-link/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/skip-link';
import { SkipLink } from '.';

export default { title: 'Skip link', component: SkipLink } satisfies Meta<typeof SkipLink>;

export const Default = {
  render: () => <SkipLink href="#main-content">Skip to main content</SkipLink>,
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
