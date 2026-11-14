import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/label/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/label';
import { Label } from '.';

export default { title: 'Label', component: Label } satisfies Meta<typeof Label>;

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
