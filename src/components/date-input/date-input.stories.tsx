import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/date-input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/date-input';
import * as DateInput from '.';

export default { title: 'Date input', component: DateInput.Root } satisfies Meta<
  typeof DateInput.Root
>;

export const Default = {
  render: () => (
    <DateInput.Field
      id="passport-issued"
      namePrefix="passport-issued"
      legend="When was your passport issued?"
      hint="For example, 27 3 2007"
    />
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
