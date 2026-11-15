import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/summary-list/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/summary-list';
import * as SummaryList from '.';

export default { title: 'Summary list', component: SummaryList.Root } satisfies Meta<
  typeof SummaryList.Root
>;

export const Default = {
  render: () => (
    <SummaryList.Root>
      <SummaryList.Row>
        <SummaryList.Key>Name</SummaryList.Key>
        <SummaryList.Value>Sarah Philips</SummaryList.Value>
        <SummaryList.Actions>
          <SummaryList.ActionComposite href="/name" visuallyHiddenText="name">
            Change
          </SummaryList.ActionComposite>
        </SummaryList.Actions>
      </SummaryList.Row>
    </SummaryList.Root>
  ),
};

export const Card = {
  render: () => (
    <SummaryList.Card.Root>
      <SummaryList.Card.TitleWrapper>
        <SummaryList.Card.Title>University of Gloucestershire</SummaryList.Card.Title>
        <SummaryList.Card.Actions>
          <SummaryList.ActionComposite
            href="/delete"
            visuallyHiddenText="(University of Gloucestershire)"
          >
            Delete choice
          </SummaryList.ActionComposite>
        </SummaryList.Card.Actions>
      </SummaryList.Card.TitleWrapper>
      <SummaryList.Card.Content>
        <SummaryList.Root>
          <SummaryList.Row>
            <SummaryList.Key>Course</SummaryList.Key>
            <SummaryList.Value>English (3DMD)</SummaryList.Value>
          </SummaryList.Row>
        </SummaryList.Root>
      </SummaryList.Card.Content>
    </SummaryList.Card.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
