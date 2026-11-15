import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/panel/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/panel';
import * as Panel from '.';

export default { title: 'Panel', component: Panel.Root } satisfies Meta<typeof Panel.Root>;

export const Confirmation = {
  render: () => (
    <Panel.Root>
      <Panel.Title>Application complete</Panel.Title>
      <Panel.Body>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </Panel.Body>
    </Panel.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
