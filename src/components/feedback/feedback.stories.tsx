import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/feedback/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/feedback';
import { Body } from '../../core/body';
import { Link } from '../../core/link';
import * as Feedback from '.';

export default { title: 'Feedback', component: Feedback.Root } satisfies Meta<typeof Feedback.Root>;

export const Default = {
  render: () => (
    <Feedback.Composite title="Help us improve this service">
      <Body>
        Tell us about your experience using this service.{' '}
        <Link href="/feedback">Give us your feedback</Link>
      </Body>
    </Feedback.Composite>
  ),
};

export const WithParts = {
  render: () => (
    <Feedback.Root>
      <Feedback.GridRow>
        <Feedback.GridColumn data-testid="feedback-column">
          <Feedback.Title>Help us improve this service</Feedback.Title>
        </Feedback.GridColumn>
      </Feedback.GridRow>
    </Feedback.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
