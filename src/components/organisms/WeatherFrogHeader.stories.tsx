import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WeatherFrogHeader } from './WeatherFrogHeader';

const meta: Meta<typeof WeatherFrogHeader> = {
  title: 'Organisms/WeatherFrogHeader',
  component: WeatherFrogHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    temp: { control: 'number' },
    condition: { control: 'text' },
    summary: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof WeatherFrogHeader>;

export const Default: Story = {
  args: {
    temp: 72,
    condition: 'Partly Sunny & Warm',
    summary: 'Expect pleasant mild winds, perfect for an evening walk.',
  },
};

export const Rainy: Story = {
  args: {
    temp: 58,
    condition: 'Gentle Rain',
    summary: 'Soft drizzle expected throughout the afternoon; grab a warm tea.',
  },
};

export const Sunny: Story = {
  args: {
    temp: 84,
    condition: 'Sunny & Clear',
    summary: 'Bright golden sunshine all day with light warm breezes.',
  },
};
