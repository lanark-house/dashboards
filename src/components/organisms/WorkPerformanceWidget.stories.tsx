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
