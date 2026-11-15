import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/textarea/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/textarea';
import * as Textarea from '.';

const meta = { title: 'Textarea', component: Textarea.Field } satisfies Meta<typeof Textarea.Field>;

export default meta;

export const Field: StoryObj<typeof meta> = {
  args: {
    name: 'more-detail',
    label: 'Can you provide more detail?',
    hint: 'Do not include personal information',
  },
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
