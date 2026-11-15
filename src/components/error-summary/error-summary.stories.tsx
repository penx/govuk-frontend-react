import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/error-summary/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/error-summary';
import * as ErrorSummary from '.';

export default { title: 'Error summary', component: ErrorSummary.Root } satisfies Meta<
  typeof ErrorSummary.Root
>;

export const Default = {
  render: () => (
    <ErrorSummary.RootComposite>
      <ErrorSummary.Title>There is a problem</ErrorSummary.Title>
      <ErrorSummary.Body>
        <ErrorSummary.List>
          <ErrorSummary.ListItem>
            <a href="#passport-issued">The date your passport was issued must be in the past</a>
          </ErrorSummary.ListItem>
          <ErrorSummary.ListItem>
            <a href="#postcode">Enter a postcode, like AA1 1AA</a>
          </ErrorSummary.ListItem>
        </ErrorSummary.List>
      </ErrorSummary.Body>
    </ErrorSummary.RootComposite>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
