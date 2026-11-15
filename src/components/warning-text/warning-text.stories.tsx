import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/warning-text/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/warning-text';
import * as WarningText from '.';

const meta = {
  title: 'Warning text',
  component: WarningText.Root,
} satisfies Meta<typeof WarningText.Root>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <WarningText.Root {...args}>
      <WarningText.Icon />{' '}
      <WarningText.TextComposite>
        You can be fined up to £5,000 if you do not register.
      </WarningText.TextComposite>
    </WarningText.Root>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
