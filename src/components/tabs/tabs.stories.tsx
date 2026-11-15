import type { Meta } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/tabs/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/tabs';
import { Heading } from '../../core/heading';
import * as Tabs from '.';

export default { title: 'Tabs', component: Tabs.Root } satisfies Meta<typeof Tabs.Root>;

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
      </Tabs.List>
      <Tabs.Panel id="past-day" selected>
        <Heading size="l">Past day</Heading>
      </Tabs.Panel>
      <Tabs.Panel id="past-week">
        <Heading size="l">Past week</Heading>
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
