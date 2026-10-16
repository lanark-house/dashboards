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
    isLoading: {
      control: 'boolean',
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
      temperature: 65,
      humidity: 55,
      weatherCondition: 'Overcast & Cool',
      activeLightsCount: 8,
      totalLightsCount: 12,
      securityStatus: 'Disarmed',
    },
  },
};
