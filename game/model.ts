export const BOARD_SIZE = 6;
export const BOARD_CELLS = BOARD_SIZE * BOARD_SIZE;

export const LUMEN_COLORS = [
  'solar',
  'verdant',
  'terra',
  'nova',
  'cosmic',
  'aether',
  'blaze',
] as const;

export type LumenColor = (typeof LUMEN_COLORS)[number];

export type Tile = {
  id: number;
  color: LumenColor;
  fusion?: boolean;
};

export type Board = Array<Tile | null>;

export type LineDirection = {
  row: number;
  col: number;
};

export type BoosterKind = 'shuffle' | 'bomb' | 'burst';

export type LevelConfig = {
  level: number;
  targetScore: number;
  moves: number;
  world: string;
  title: string;
  lesson: string;
  canSpawnVortex: boolean;
};

export type CompletedLevel = {
  stars: number;
  bestScore: number;
};

export type SavedProgress = {
  highestUnlocked: number;
  completed: Record<number, CompletedLevel>;
  coins: number;
  sound: boolean;
  music: boolean;
  dailyGiftClaimedOn?: string;
};

export const BOOSTER_PRICES: Record<BoosterKind, number> = {
  shuffle: 100,
  bomb: 150,
  burst: 250,
};

export const DEFAULT_PROGRESS: SavedProgress = {
  highestUnlocked: 1,
  completed: {},
  coins: 1000,
  sound: true,
  music: true,
};