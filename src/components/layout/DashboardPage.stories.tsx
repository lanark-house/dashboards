import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DashboardPage } from './DashboardPage';

const meta: Meta<typeof DashboardPage> = {
  title: 'Layout/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};
