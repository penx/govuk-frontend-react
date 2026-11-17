import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import { fn } from 'storybook/test';
import fixtures from 'govuk-frontend/dist/govuk/components/button/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/button';
import { Body } from '../../core/body';
import * as Button from '.';

const meta = {
  title: 'Button',
  component: Button.Root,
  args: { onClick: fn() },
} satisfies Meta<typeof Button.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithReactRouter: Story = {
  render: () => (
    <MemoryRouter>
      <Button.Root as={Link} to="/">
        Home
      </Button.Root>{' '}
      <Button.Root as={Link} to="/about">
        About
      </Button.Root>{' '}
      <Button.Root as={Link} to="/missing">
        Bad link
      </Button.Root>
      <Body>
        <Routes>
          <Route path="/" element="Home" />
          <Route path="/about" element="About" />
          <Route path="*" element="404" />
        </Routes>
      </Body>
    </MemoryRouter>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
