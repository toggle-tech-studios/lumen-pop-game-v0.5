import type { LevelConfig } from './model';

export function getLevelConfig(level: number): LevelConfig {
  return {
    level,
    targetScore: 5000 + (level - 1) * 1000,
    moves: 40 + (level - 1) * 20,
    world: level < 11 ? 'Starlight Meadows' : level < 26 ? 'Crystal Valley' : 'Twilight Grove',
    title: level < 11 ? 'First Glow' : level < 26 ? 'Crystal Drift' : 'Moonlit Bloom',
    lesson: level <= 2
      ? 'Make an easy 3-link to wake the meadow'
      : level <= 5
        ? 'Longer chains charge brighter rewards'
        : 'Find the clearest line through the glow',
    canSpawnVortex: level >= 5,
  };
}

export function starsForScore(score: number, targetScore: number): number {
  if (score >= targetScore) return 3;
  if (score >= targetScore * 0.66) return 2;
  if (score >= targetScore * 0.33) return 1;
  return 0;
}