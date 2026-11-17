import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/textarea/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/textarea';
import * as Textarea from '.';

const meta = { title: 'Textarea', component: Textarea.Field } satisfies Meta<typeof Textarea.Field>;

export default meta;

export const Field: StoryObj<typeof meta> = {
  args: {
    id: 'more-detail',
    name: 'moreDetail',
    label: 'Can you provide more detail?',
    labelSize: 'l',
    labelIsPageHeading: true,
    hint: 'Do not include personal or financial information, like your National Insurance number or credit card details',
  },
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
