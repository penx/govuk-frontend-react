import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '.';

const meta = { title: 'Core/Link', component: Link } satisfies Meta<typeof Link>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { href: '/guidance', children: 'Read the guidance' },
};
