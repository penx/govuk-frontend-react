import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from '.';

const meta = { title: 'Utilities/Visually hidden', component: VisuallyHidden } satisfies Meta<
  typeof VisuallyHidden
>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { children: 'Only screen readers announce this' },
};
