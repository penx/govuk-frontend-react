import type { Meta, StoryObj } from '@storybook/react-vite';
import { Caption } from '.';

const meta = { title: 'Core/Caption', component: Caption } satisfies Meta<typeof Caption>;

export default meta;

export const Default: StoryObj<typeof meta> = { args: { size: 'l', children: 'Juggling licence' } };
