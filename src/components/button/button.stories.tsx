import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import { fn } from 'storybook/test';
import fixtures from 'govuk-frontend/dist/govuk/components/button/fixtures.json';
import { fixturesStory } from '../../../.storybook/fixtures';
import nunjucks from '../../../tests/nunjucks/button';
import * as Button from '.';

const meta = {
  title: 'Button',
  component: Button.Root,
  args: { onClick: fn() },
} satisfies Meta<typeof Button.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithText: Story = { args: { children: 'Hello Button' } };

export const WithSomeEmoji: Story = {
  args: {
    children: (
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    ),
  },
};

export const AsALink: Story = { args: { href: 'https://www.gov.uk', children: 'Hello Button' } };

export const WithHrefAndRole: Story = {
  args: { href: '#test', role: 'presentation', children: 'HREF and role' },
};

export const WithType: Story = { args: { type: 'button', children: 'Button with type' } };

export const Start: Story = { args: { start: true, href: '#', children: 'Start now' } };

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
      <p className="govuk-body">
        <Routes>
          <Route path="/" element="Home" />
          <Route path="/about" element="About" />
          <Route path="*" element="404" />
        </Routes>
      </p>
    </MemoryRouter>
  ),
};

export const GovukFrontendFixtures = fixturesStory(nunjucks, fixtures);
