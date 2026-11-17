import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/select/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/select';
import * as Select from '.';

const meta = { title: 'Select', component: Select.Field } satisfies Meta<typeof Select.Field>;

export default meta;

export const Field: StoryObj<typeof meta> = {
  args: {
    id: 'sort',
    name: 'sort',
    label: 'Sort by',
    defaultValue: 'updated',
    children: (
      <>
        <option value="published">Recently published</option>
        <option value="updated">Recently updated</option>
        <option value="views">Most views</option>
        <option value="comments">Most comments</option>
      </>
    ),
  },
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
