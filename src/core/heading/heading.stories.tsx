import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '.';

const meta = { title: 'Core/Heading', component: Heading } satisfies Meta<typeof Heading>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { size: 'l', headingLevel: 1, children: 'Apply for a juggling licence' },
};
