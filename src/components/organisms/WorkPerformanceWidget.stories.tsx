import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WorkPerformanceWidget } from './WorkPerformanceWidget';

const meta: Meta<typeof WorkPerformanceWidget> = {
  title: 'Organisms/WorkPerformanceWidget',
  component: WorkPerformanceWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkPerformanceWidget>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const XLarge: Story = {
  args: {
    size: 'xlarge',
  },
};

export const Loading: Story = {
  args: {
    size: 'medium',
    isLoading: true,
  },
};

export const CustomData: Story = {
  args: {
    size: 'large',
    data: {
      openPRs: 5,
      ciSuccessRate: 100,
      buildStatus: 'PASSING',
      commitsToday: 28,
      serverHealth: {
        cpuUsage: 45,
        memoryUsage: 68,
      },
    },
  },
};
