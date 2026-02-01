
/**
 * NAVIGATION TYPES
 * These definitions help TypeScript ensure we only navigate to valid screens.
 * If you add a new page, add its name to the AppView union type here.
 */
export type AppView = 'HOME' | 'AUTO' | 'MANUAL' | 'VIBRATE' | 'TEST' | 'SETTINGS' | 'DONATE';

/**
 * SESSION STATE
 * Tracks the status of an ongoing cleaning operation.
 */
export interface CleaningSession {
  type: AppView;    // Which mode is being used
  progress: number; // 0 to 100
  isActive: boolean; // Is the sound/vibration currently running?
}

/**
 * THEME OPTIONS
 * Defines the available visual styles for the app.
 */
export enum Theme {
  DARK = 'dark',     // Pure black for OLED screens
  DEFAULT = 'default' // Dark blue slate for a softer look
}
