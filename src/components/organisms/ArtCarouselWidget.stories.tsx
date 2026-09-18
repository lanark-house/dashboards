import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArtCarouselWidget } from './ArtCarouselWidget';

const meta: Meta<typeof ArtCarouselWidget> = {
  title: 'Organisms/ArtCarouselWidget',
  component: ArtCarouselWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '260px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArtCarouselWidget>;

export const Default: Story = {};
