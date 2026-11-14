import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/textarea/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/textarea';
import { Textarea } from '.';

export default { title: 'Textarea', component: Textarea } satisfies Meta<typeof Textarea>;

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
