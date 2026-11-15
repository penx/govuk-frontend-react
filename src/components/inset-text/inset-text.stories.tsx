import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/inset-text/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/inset-text';
import { InsetText } from '.';

const meta = { title: 'Inset text', component: InsetText } satisfies Meta<typeof InsetText>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { children: 'It can take up to 8 weeks to register a lasting power of attorney.' },
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
