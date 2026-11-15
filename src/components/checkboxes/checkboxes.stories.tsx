import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/checkboxes/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/checkboxes';
import * as Checkboxes from '.';

export default { title: 'Checkboxes', component: Checkboxes.Root } satisfies Meta<
  typeof Checkboxes.Root
>;

export const Default = {
  render: () => (
    <Checkboxes.Field
      idPrefix="nationality"
      legend="What is your nationality?"
      hint="Select all that apply"
    >
      <Checkboxes.Item>
        <Checkboxes.Input id="nationality" name="nationality" value="british" />
        <Checkboxes.Label htmlFor="nationality">British</Checkboxes.Label>
      </Checkboxes.Item>
      <Checkboxes.Item>
        <Checkboxes.Input id="nationality-2" name="nationality" value="irish" />
        <Checkboxes.Label htmlFor="nationality-2">Irish</Checkboxes.Label>
      </Checkboxes.Item>
      <Checkboxes.Divider>or</Checkboxes.Divider>
      <Checkboxes.Item>
        <Checkboxes.Input id="nationality-3" name="nationality" value="other" />
        <Checkboxes.Label htmlFor="nationality-3">Citizen of another country</Checkboxes.Label>
      </Checkboxes.Item>
    </Checkboxes.Field>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
