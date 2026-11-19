import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/warning-text/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/warning-text';
import { WarningText, WarningTextContainer, WarningTextIcon, WarningTextTextComposite } from '.';

const meta = {
  title: 'Warning text',
  component: WarningText,
} satisfies Meta<typeof WarningText>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <WarningText {...args}>You can be fined up to £5,000 if you do not register.</WarningText>
  ),
};

export const Parts: StoryObj<typeof meta> = {
  render: (args) => (
    <WarningTextContainer {...args}>
      <WarningTextIcon />{' '}
      <WarningTextTextComposite>
        You can be fined up to £5,000 if you do not register.
      </WarningTextTextComposite>
    </WarningTextContainer>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
