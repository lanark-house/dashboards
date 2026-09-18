import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StandardWidget } from './StandardWidget';

const meta: Meta<typeof StandardWidget> = {
  title: 'Templates/StandardWidget',
  component: StandardWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StandardWidget>;

export const Default: Story = {
  args: {
    title: 'Sample Widget',
    size: 'medium',
    loading: false,
    children: <div className="text-white p-2">Widget Content Body</div>,
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Widget',
    size: 'medium',
    loading: true,
    children: <div className="text-white p-2">Widget Content Body</div>,
  },
};
