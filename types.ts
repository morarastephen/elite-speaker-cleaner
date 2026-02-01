
export type AppView = 'HOME' | 'AUTO' | 'MANUAL' | 'VIBRATE' | 'TEST' | 'SETTINGS';

export interface CleaningSession {
  type: AppView;
  progress: number;
  isActive: boolean;
}

export enum Theme {
  DARK = 'dark',
  DEFAULT = 'default'
}
