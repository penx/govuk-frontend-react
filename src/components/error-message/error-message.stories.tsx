import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/error-message/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/error-message';
import * as DateInput from '../date-input';
import { ErrorMessage } from '.';

export default { title: 'Error message', component: ErrorMessage } satisfies Meta<
  typeof ErrorMessage
>;

export const Default = {
  render: () => (
    <DateInput.Field
      id="passport-issued"
      namePrefix="passport-issued"
      legend="When was your passport issued?"
      legendSize="l"
      legendIsPageHeading
      hint="For example, 27 3 2007"
      errorMessage="The date your passport was issued must be in the past"
    />
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
