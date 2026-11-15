import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/radios/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/radios';
import * as Radios from '.';

export default { title: 'Radios', component: Radios.Root } satisfies Meta<typeof Radios.Root>;

export const Default = {
  render: () => (
    <Radios.Field idPrefix="where-do-you-live" legend="Where do you live?" hint="Select one option">
      <Radios.Item>
        <Radios.Input id="where-do-you-live" name="where-do-you-live" value="england" />
        <Radios.Label htmlFor="where-do-you-live">England</Radios.Label>
      </Radios.Item>
      <Radios.Item>
        <Radios.Input id="where-do-you-live-2" name="where-do-you-live" value="scotland" />
        <Radios.Label htmlFor="where-do-you-live-2">Scotland</Radios.Label>
      </Radios.Item>
      <Radios.Divider>or</Radios.Divider>
      <Radios.Item>
        <Radios.Input id="where-do-you-live-3" name="where-do-you-live" value="abroad" />
        <Radios.Label htmlFor="where-do-you-live-3">I live abroad</Radios.Label>
      </Radios.Item>
    </Radios.Field>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
