import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/fieldset/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/fieldset';
import { Fieldset } from '.';

export default { title: 'Fieldset', component: Fieldset } satisfies Meta<typeof Fieldset>;

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
