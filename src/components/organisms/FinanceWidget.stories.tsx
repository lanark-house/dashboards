import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FinanceWidget } from './FinanceWidget';

const meta: Meta<typeof FinanceWidget> = {
  title: 'Organisms/FinanceWidget',
  component: FinanceWidget,
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
type Story = StoryObj<typeof FinanceWidget>;

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
      portfolioValue: 250000,
      dayChange: -1850,
      dayChangePercent: -0.74,
      marketStatus: 'OFFLINE',
      sparkline: [252000, 251500, 251000, 250800, 250200, 250000],
    },
  },
};
