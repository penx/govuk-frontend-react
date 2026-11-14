import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/hint/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/hint';
import { Hint } from '.';

export default { title: 'Hint', component: Hint } satisfies Meta<typeof Hint>;

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
