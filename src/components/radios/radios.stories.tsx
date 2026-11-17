import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/radios/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/radios';
import * as Radios from '.';

export default { title: 'Radios', component: Radios.Root } satisfies Meta<typeof Radios.Root>;

export const Default = {
  render: () => (
    <Radios.Field
      idPrefix="whereDoYouLive"
      legend="Where do you live?"
      legendSize="l"
      legendIsPageHeading
    >
      <Radios.ItemComposite
        id="whereDoYouLive"
        name="whereDoYouLive"
        value="england"
        label="England"
      />
      <Radios.ItemComposite
        id="whereDoYouLive-2"
        name="whereDoYouLive"
        value="scotland"
        label="Scotland"
      />
      <Radios.ItemComposite
        id="whereDoYouLive-3"
        name="whereDoYouLive"
        value="wales"
        label="Wales"
      />
      <Radios.ItemComposite
        id="whereDoYouLive-4"
        name="whereDoYouLive"
        value="northern-ireland"
        label="Northern Ireland"
      />
    </Radios.Field>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
