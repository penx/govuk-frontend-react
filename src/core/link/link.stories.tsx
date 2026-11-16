import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link as RouterLink, MemoryRouter } from 'react-router';
import { Link } from '.';

const meta = { title: 'Core/Link', component: Link } satisfies Meta<typeof Link>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { href: '/guidance', children: 'Read the guidance' },
};

export const WithReactRouter: StoryObj<typeof meta> = {
  render: () => (
    <MemoryRouter>
      <Link asChild>
        <RouterLink to="/guidance">Read the guidance</RouterLink>
      </Link>
    </MemoryRouter>
  ),
};
