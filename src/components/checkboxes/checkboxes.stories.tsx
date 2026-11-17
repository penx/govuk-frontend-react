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
      idPrefix="waste"
      legend="Which types of waste do you transport?"
      legendSize="l"
      legendIsPageHeading
      hint="Select all that apply"
    >
      <Checkboxes.ItemComposite
        id="waste"
        name="waste"
        value="carcasses"
        label="Waste from animal carcasses"
      />
      <Checkboxes.ItemComposite
        id="waste-2"
        name="waste"
        value="mines"
        label="Waste from mines or quarries"
      />
      <Checkboxes.ItemComposite
        id="waste-3"
        name="waste"
        value="farm"
        label="Farm or agricultural waste"
      />
    </Checkboxes.Field>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
