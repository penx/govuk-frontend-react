import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from '.';

const meta = { title: 'Core/List', component: List } satisfies Meta<typeof List>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    variant: 'bullet',
    children: ['apples', 'oranges', 'pears'].map((fruit) => <li key={fruit}>{fruit}</li>),
  },
};
