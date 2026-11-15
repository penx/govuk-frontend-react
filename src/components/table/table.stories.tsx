import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/table/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/table';
import * as Table from '.';

export default { title: 'Table', component: Table.Root } satisfies Meta<typeof Table.Root>;

export const Default = {
  render: () => (
    <Table.Root>
      <Table.Caption className="govuk-table__caption--m">Dates and amounts</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.Header scope="col">Date</Table.Header>
          <Table.Header scope="col" format="numeric">
            Amount
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Header scope="row">First 6 weeks</Table.Header>
          <Table.Cell format="numeric">£109.80 per week</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
