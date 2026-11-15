import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionBreak } from '.';

const meta = { title: 'Core/Section break', component: SectionBreak } satisfies Meta<
  typeof SectionBreak
>;

export default meta;

export const Default: StoryObj<typeof meta> = { args: { size: 'l', visible: true } };
