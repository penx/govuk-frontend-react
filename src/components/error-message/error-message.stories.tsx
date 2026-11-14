import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/error-message/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/error-message';
import { ErrorMessage } from '.';

export default { title: 'Error message', component: ErrorMessage } satisfies Meta<
  typeof ErrorMessage
>;

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
