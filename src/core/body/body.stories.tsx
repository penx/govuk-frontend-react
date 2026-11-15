import type { Meta, StoryObj } from '@storybook/react-vite';
import { Body } from '.';

const meta = { title: 'Core/Body', component: Body } satisfies Meta<typeof Body>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { children: 'This is a paragraph of body text.' },
};
