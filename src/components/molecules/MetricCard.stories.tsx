import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const UpTrend: Story = {
  args: {
    title: 'Revenue',
    value: '$12,450',
    subtext: '+12.5%',
    trend: 'up',
  },
};

export const DownTrend: Story = {
  args: {
    title: 'Churn',
    value: '2.4%',
    subtext: '-0.8%',
    trend: 'down',
  },
};

export const NeutralTrend: Story = {
  args: {
    title: 'Users',
    value: '1,024',
    subtext: '0.0%',
    trend: 'neutral',
  },
};
