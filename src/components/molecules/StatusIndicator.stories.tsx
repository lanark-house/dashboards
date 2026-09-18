import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusIndicator } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Molecules/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['ONLINE', 'OFFLINE', 'WARNING', 'OPEN'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Online: Story = {
  args: {
    status: 'ONLINE',
    label: 'ONLINE',
  },
};

export const Warning: Story = {
  args: {
    status: 'WARNING',
    label: 'WARNING',
  },
};

export const Offline: Story = {
  args: {
    status: 'OFFLINE',
    label: 'OFFLINE',
  },
};
