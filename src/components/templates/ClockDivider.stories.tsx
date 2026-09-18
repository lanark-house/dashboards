import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ClockDivider } from './ClockDivider';

const meta: Meta<typeof ClockDivider> = {
  title: 'Templates/ClockDivider',
  component: ClockDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClockDivider>;

export const Default: Story = {};
