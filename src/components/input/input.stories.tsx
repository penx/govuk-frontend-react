import type { Meta, StoryObj } from '@storybook/react-vite';
import fixtures from 'govuk-frontend/dist/govuk/components/input/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/input';
import * as Input from '.';

const meta = { title: 'Input', component: Input.Root } satisfies Meta<typeof Input.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 'test', label: 'Label', hint: 'Hint', errorMessage: 'Error' },
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
