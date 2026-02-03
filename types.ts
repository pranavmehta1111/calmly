
export enum ThemeName {
  Beige = 'Beige',
  Sage = 'Sage',
  Pink = 'Pink',
  Midnight = 'Midnight'
}

export interface ThemeColors {
  bg: string;
  card: string;
  text: string;
  muted: string;
  accent: string;
  border: string;
}

export type MoodType = 'sunny' | 'cloudy' | 'rainy' | 'moon' | 'sparkle';

export interface MoodEntry {
  date: string;
  mood: MoodType;
}

export interface Priority {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  content: string;
  category: 'Idea' | 'Thought' | 'Dream' | 'Unsorted';
  summary?: string;
  createdAt: number;
}

export interface Ritual {
  id: string;
  name: string;
  icon: string;
  tasks: { id: string; text: string; completed: boolean }[];
  duration: number; // minutes
}

export interface MoodBoardItem {
  id: string;
  type: 'image' | 'color' | 'affirmation';
  content: string; // URL, hex, or text
}

export type AppView = 'board' | 'planner' | 'rituals' | 'notes';
