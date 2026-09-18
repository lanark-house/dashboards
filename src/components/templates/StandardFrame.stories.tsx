import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StandardFrame } from './StandardFrame';

const meta: Meta<typeof StandardFrame> = {
  title: 'Templates/StandardFrame',
  component: StandardFrame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StandardFrame>;

export const Default: Story = {
  args: {
    children: (
      <div className="col-span-6 row-span-3 flex items-center justify-center text-slate-400">
        Standard Frame Content Grid (6x3)
      </div>
    ),
  },
};
