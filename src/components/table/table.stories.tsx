import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/table/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/table';
import * as Table from '.';

export default { title: 'Table', component: Table.Root } satisfies Meta<typeof Table.Root>;

export const Default = {
  render: () => (
    <Table.Root>
      <Table.Caption size="m">Dates and amounts</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.ColumnHeader>Date</Table.ColumnHeader>
          <Table.ColumnHeader>Amount</Table.ColumnHeader>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.RowHeader>First 6 weeks</Table.RowHeader>
          <Table.Cell>£109.80 per week</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeader>Next 33 weeks</Table.RowHeader>
          <Table.Cell>£109.80 per week</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeader>Total estimated pay</Table.RowHeader>
          <Table.Cell>£4,282.20</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
