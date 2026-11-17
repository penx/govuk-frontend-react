import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/fieldset/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/fieldset';
import * as Fieldset from '.';

export default { title: 'Fieldset', component: Fieldset.Root } satisfies Meta<typeof Fieldset.Root>;

export const Default = {
  render: () => (
    <Fieldset.Composite legend="Legend as page heading" legendSize="l" legendIsPageHeading />
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
