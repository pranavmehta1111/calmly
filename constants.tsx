
import { ThemeName, ThemeColors, Ritual } from './types';

export const THEMES: Record<ThemeName, ThemeColors> = {
  [ThemeName.Beige]: {
    bg: 'bg-[#F9F7F2]',
    card: 'bg-white/60',
    text: 'text-[#4A443F]',
    muted: 'text-[#8E867E]',
    accent: 'bg-[#E5E1D8]',
    border: 'border-[#E5E1D8]'
  },
  [ThemeName.Sage]: {
    bg: 'bg-[#F2F7F2]',
    card: 'bg-white/60',
    text: 'text-[#2D3A2D]',
    muted: 'text-[#6B7C6B]',
    accent: 'bg-[#DDE8DD]',
    border: 'border-[#DDE8DD]'
  },
  [ThemeName.Pink]: {
    bg: 'bg-[#FFF5F7]',
    card: 'bg-white/60',
    text: 'text-[#5E3B42]',
    muted: 'text-[#9C7078]',
    accent: 'bg-[#FCE2E8]',
    border: 'border-[#FCE2E8]'
  },
  [ThemeName.Midnight]: {
    bg: 'bg-[#12141D]',
    card: 'bg-[#1E212E]/60',
    text: 'text-[#E2E8F0]',
    muted: 'text-[#94A3B8]',
    accent: 'bg-[#2D3748]',
    border: 'border-[#2D3748]'
  }
};

export const DEFAULT_RITUALS: Ritual[] = [
  {
    id: '1',
    name: '5-minute tidy reset',
    icon: '🧺',
    duration: 5,
    tasks: [
      { id: 't1', text: 'Clear the desk surface', completed: false },
      { id: 't2', text: 'Put away stray cups', completed: false },
      { id: 't3', text: 'Arrange pillows', completed: false }
    ]
  },
  {
    id: '2',
    name: 'Creative desk refresh',
    icon: '🎨',
    duration: 10,
    tasks: [
      { id: 't4', text: 'Refill water carafe', completed: false },
      { id: 't5', text: 'Light a candle', completed: false },
      { id: 't6', text: 'Open a window for fresh air', completed: false }
    ]
  },
  {
    id: '3',
    name: 'Sunday calm reset',
    icon: '🕯️',
    duration: 20,
    tasks: [
      { id: 't7', text: 'Review the coming week', completed: false },
      { id: 't8', text: 'Refill journals', completed: false },
      { id: 't9', text: 'Water the plants', completed: false }
    ]
  }
];

export const MOOD_ICONS = {
  sunny: '🌤️',
  cloudy: '☁️',
  rainy: '🌧️',
  moon: '🌙',
  sparkle: '✨'
};
