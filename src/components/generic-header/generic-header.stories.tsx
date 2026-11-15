import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/generic-header/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/generic-header';
import * as GenericHeader from '.';

export default { title: 'Generic header', component: GenericHeader.Root } satisfies Meta<
  typeof GenericHeader.Root
>;

export const Default = {
  render: () => (
    <GenericHeader.Root>
      <GenericHeader.Container>
        <GenericHeader.Logo>
          <GenericHeader.HomepageLink>My cool service</GenericHeader.HomepageLink>
        </GenericHeader.Logo>
      </GenericHeader.Container>
    </GenericHeader.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
