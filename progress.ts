import { DEFAULT_PROGRESS, type SavedProgress } from './model';

export const PROGRESS_STORAGE_KEY = 'lumen-pop-progress';

export function normalizeProgress(value: Partial<SavedProgress> | null | undefined): SavedProgress {
  return {
    ...DEFAULT_PROGRESS,
    ...value,
    completed: {
      ...DEFAULT_PROGRESS.completed,
      ...(value?.completed ?? {}),
    },
  };
}

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}