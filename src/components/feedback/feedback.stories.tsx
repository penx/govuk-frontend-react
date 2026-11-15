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
    <Feedback.Root>
      <Feedback.Title>Help us improve this service</Feedback.Title>
      <Feedback.Body>
        <Body>
          Tell us about your experience using this service.{' '}
          <Link href="/feedback">Give us your feedback</Link>
        </Body>
      </Feedback.Body>
    </Feedback.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
