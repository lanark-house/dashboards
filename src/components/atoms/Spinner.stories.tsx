import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    className: 'w-6 h-6 text-indigo-400',
  },
};
