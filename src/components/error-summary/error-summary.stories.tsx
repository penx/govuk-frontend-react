import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/error-summary/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/error-summary';
import * as ErrorSummary from '.';

export default { title: 'Error summary', component: ErrorSummary.Composite } satisfies Meta<
  typeof ErrorSummary.Composite
>;

export const Default = {
  render: () => (
    <ErrorSummary.Composite title="There is a problem">
      <ErrorSummary.ListItemComposite href="#passport-issued">
        The date your passport was issued must be in the past
      </ErrorSummary.ListItemComposite>
      <ErrorSummary.ListItemComposite href="#postcode">
        Enter a postcode, like AA1 1AA
      </ErrorSummary.ListItemComposite>
    </ErrorSummary.Composite>
  ),
};

export const WithParts = {
  render: () => (
    <ErrorSummary.Root>
      <ErrorSummary.Alert>
        <ErrorSummary.Title>There is a problem</ErrorSummary.Title>
        <ErrorSummary.Body>
          <ErrorSummary.List>
            <ErrorSummary.ListItem>
              <ErrorSummary.ListItemLink href="#passport-issued">
                The date your passport was issued must be in the past
              </ErrorSummary.ListItemLink>
            </ErrorSummary.ListItem>
          </ErrorSummary.List>
        </ErrorSummary.Body>
      </ErrorSummary.Alert>
    </ErrorSummary.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
