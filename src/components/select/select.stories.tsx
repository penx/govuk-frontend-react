import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/select/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/select';
import { Select } from '.';

const meta = { title: 'Select', component: Select } satisfies Meta<typeof Select>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    id: 'sort',
    label: 'Sort by',
    defaultValue: 'published',
    children: (
      <>
        <option value="published">Recently published</option>
        <option value="updated">Recently updated</option>
        <option value="views">Most views</option>
      </>
    ),
  },
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
