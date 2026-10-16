import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SecondaryInfoWidget } from './SecondaryInfoWidget';

const meta: Meta<typeof SecondaryInfoWidget> = {
  title: 'Organisms/SecondaryInfoWidget',
  component: SecondaryInfoWidget,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SecondaryInfoWidget>;

export const Default: Story = {};

export const CustomData: Story = {
  args: {
    data: {
      nowPlaying: {
        title: 'Clair de Lune',
        artist: 'Claude Debussy',
        album: 'Suite Bergamasque',
        isPlaying: true,
      },
      weather: {
        temp: 68,
        high: 72,
        low: 55,
        condition: 'Clear Sky',
        location: 'Library Nook',
      },
      reminders: [
        { id: '1', text: 'Water patio plants', time: '5:00 PM', completed: false },
        { id: '2', text: 'Read Chapter 4 of book', time: '8:00 PM', completed: false },
      ],
      anniversary: {
        title: 'Trip Countdown',
        daysLeft: 12,
        targetDate: 'July 20, 2025',
        subtitle: 'Summer vacation getaway',
      },
    },
  },
};
