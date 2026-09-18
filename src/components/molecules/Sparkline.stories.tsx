import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sparkline } from './Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'Molecules/Sparkline',
  component: Sparkline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {
  args: {
    data: [10, 15, 8, 22, 18, 25, 30, 28, 35],
    color: '#10b981',
    height: 36,
  },
};
