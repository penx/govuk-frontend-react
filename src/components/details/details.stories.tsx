import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/details/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/details';
import * as Details from '.';

export default { title: 'Details', component: Details.Root } satisfies Meta<typeof Details.Root>;

export const Default = {
  render: () => (
    <Details.Root>
      <Details.Summary>
        <Details.SummaryText>Help with nationality</Details.SummaryText>
      </Details.Summary>
      <Details.Text>
        We need to know your nationality so we can work out which elections you’re entitled to vote
        in. If you cannot provide your nationality, you’ll have to send copies of identity documents
        through the post.
      </Details.Text>
    </Details.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
