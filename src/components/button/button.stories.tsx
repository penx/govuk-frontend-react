import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import { fn } from 'storybook/test';
import fixtures from 'govuk-frontend/dist/govuk/components/button/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/button';
import { Body } from '../../core/body';
import { Button, StartButton } from '.';

const meta = {
  title: 'Button',
  component: Button,
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithReactRouter: Story = {
  render: () => (
    <MemoryRouter>
      <Button as={Link} to="/">
        Home
      </Button>{' '}
      <Button as={Link} to="/about">
        About
      </Button>{' '}
      <Button as={Link} to="/missing">
        Bad link
      </Button>
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

export const Start: Story = {
  render: () => <StartButton href="#">Start now</StartButton>,
};
