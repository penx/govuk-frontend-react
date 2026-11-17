import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/tabs/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/tabs';
import { Heading } from '../../core/heading';
import * as Table from '../table';
import * as Tabs from '.';

export default { title: 'Tabs', component: Tabs.Root } satisfies Meta<typeof Tabs.Root>;

const caseHead = (
  <>
    <Table.ColumnHeader>Case manager</Table.ColumnHeader>
    <Table.ColumnHeader>Cases opened</Table.ColumnHeader>
    <Table.ColumnHeader>Cases closed</Table.ColumnHeader>
  </>
);

export const Default = {
  render: () => (
    <Tabs.Root>
      <Tabs.Title />
      <Tabs.List>
        <Tabs.ListItem selected>
          <Tabs.Tab href="#past-day">Past day</Tabs.Tab>
        </Tabs.ListItem>
        <Tabs.ListItem>
          <Tabs.Tab href="#past-week">Past week</Tabs.Tab>
        </Tabs.ListItem>
        <Tabs.ListItem>
          <Tabs.Tab href="#past-month">Past month</Tabs.Tab>
        </Tabs.ListItem>
        <Tabs.ListItem>
          <Tabs.Tab href="#past-year">Past year</Tabs.Tab>
        </Tabs.ListItem>
      </Tabs.List>
      <Tabs.Panel id="past-day" selected>
        <Heading size="l">Past day</Heading>
        <Table.Composite head={caseHead}>
          <Table.Row>
            <Table.Cell>David Francis</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Paul Farmer</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rita Patel</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>0</Table.Cell>
          </Table.Row>
        </Table.Composite>
      </Tabs.Panel>
      <Tabs.Panel id="past-week">
        <Heading size="l">Past week</Heading>
        <Table.Composite head={caseHead}>
          <Table.Row>
            <Table.Cell>David Francis</Table.Cell>
            <Table.Cell>24</Table.Cell>
            <Table.Cell>18</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Paul Farmer</Table.Cell>
            <Table.Cell>16</Table.Cell>
            <Table.Cell>20</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rita Patel</Table.Cell>
            <Table.Cell>24</Table.Cell>
            <Table.Cell>27</Table.Cell>
          </Table.Row>
        </Table.Composite>
      </Tabs.Panel>
      <Tabs.Panel id="past-month">
        <Heading size="l">Past month</Heading>
        <Table.Composite head={caseHead}>
          <Table.Row>
            <Table.Cell>David Francis</Table.Cell>
            <Table.Cell>98</Table.Cell>
            <Table.Cell>95</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Paul Farmer</Table.Cell>
            <Table.Cell>122</Table.Cell>
            <Table.Cell>131</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rita Patel</Table.Cell>
            <Table.Cell>126</Table.Cell>
            <Table.Cell>142</Table.Cell>
          </Table.Row>
        </Table.Composite>
      </Tabs.Panel>
      <Tabs.Panel id="past-year">
        <Heading size="l">Past year</Heading>
        <Table.Composite head={caseHead}>
          <Table.Row>
            <Table.Cell>David Francis</Table.Cell>
            <Table.Cell>1380</Table.Cell>
            <Table.Cell>1472</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Paul Farmer</Table.Cell>
            <Table.Cell>1129</Table.Cell>
            <Table.Cell>1083</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Rita Patel</Table.Cell>
            <Table.Cell>1539</Table.Cell>
            <Table.Cell>1265</Table.Cell>
          </Table.Row>
        </Table.Composite>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
