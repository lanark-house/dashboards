import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComicArtCarouselWidget } from './ComicArtCarouselWidget';

const meta: Meta<typeof ComicArtCarouselWidget> = {
  title: 'Organisms/ComicArtCarouselWidget',
  component: ComicArtCarouselWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '420px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ComicArtCarouselWidget>;

export const Default: Story = {};
