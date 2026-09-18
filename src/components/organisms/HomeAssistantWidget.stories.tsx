import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HomeAssistantWidget } from './HomeAssistantWidget';

const meta: Meta<typeof HomeAssistantWidget> = {
  title: 'Organisms/HomeAssistantWidget',
  component: HomeAssistantWidget,
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
type Story = StoryObj<typeof HomeAssistantWidget>;

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
