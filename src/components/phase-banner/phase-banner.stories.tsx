import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/phase-banner/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/phase-banner';
import * as PhaseBanner from '.';

export default { title: 'Phase banner', component: PhaseBanner.Root } satisfies Meta<
  typeof PhaseBanner.Root
>;

export const Default = {
  render: () => (
    <PhaseBanner.Root>
      <PhaseBanner.Content>
        <PhaseBanner.Tag>Alpha</PhaseBanner.Tag>{' '}
        <PhaseBanner.Text>
          This is a new service. Your{' '}
          <a href="/feedback" className="govuk-link">
            feedback
          </a>{' '}
          will help us to improve it.
        </PhaseBanner.Text>
      </PhaseBanner.Content>
    </PhaseBanner.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
