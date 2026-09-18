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
