import {
  BOARD_CELLS,
  BOARD_SIZE,
  LUMEN_COLORS,
  type Board,
  type LineDirection,
  type LumenColor,
  type Tile,
} from './model';

export type RandomSource = () => number;
export type TileIdSource = () => number;

const ALL_DIRECTIONS: LineDirection[] = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

const GUARANTEED_DIRECTIONS: LineDirection[] = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: -1 },
];

let nextTileId = 100;

export const defaultTileId: TileIdSource = () => nextTileId++;
export const randomColor = (random: RandomSource = Math.random): LumenColor =>
  LUMEN_COLORS[Math.floor(random() * LUMEN_COLORS.length)];
export const rowOf = (index: number) => Math.floor(index / BOARD_SIZE);
export const colOf = (index: number) => index % BOARD_SIZE;

export function directionBetween(from: number, to: number): LineDirection | null {
  const row = rowOf(to) - rowOf(from);
  const col = colOf(to) - colOf(from);
  if (Math.abs(row) > 1 || Math.abs(col) > 1 || (row === 0 && col === 0)) return null;
  return { row: Math.sign(row), col: Math.sign(col) };
}

export function lineStep(from: number, to: number, direction: LineDirection): boolean {
  return rowOf(to) - rowOf(from) === direction.row
    && colOf(to) - colOf(from) === direction.col;
}

export function hasPlayableChain(board: Board): boolean {
  for (let start = 0; start < board.length; start += 1) {
    const tile = board[start];
    if (!tile) continue;
    for (const direction of ALL_DIRECTIONS) {
      let length = 1;
      let row = rowOf(start) + direction.row;
      let col = colOf(start) + direction.col;
      while (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
        const next = row * BOARD_SIZE + col;
        if (board[next]?.color !== tile.color) break;
        length += 1;
        if (length >= 3) return true;
        row += direction.row;
        col += direction.col;
      }
    }
  }
  return false;
}

export function installGuaranteedLine(
  board: Tile[],
  color: LumenColor,
  random: RandomSource = Math.random,
): void {
  const direction = GUARANTEED_DIRECTIONS[Math.floor(random() * GUARANTEED_DIRECTIONS.length)];
  const starts: number[] = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const endRow = row + direction.row * 2;
      const endCol = col + direction.col * 2;
      if (endRow >= 0 && endRow < BOARD_SIZE && endCol >= 0 && endCol < BOARD_SIZE) {
        starts.push(row * BOARD_SIZE + col);
      }
    }
  }
  const start = starts[Math.floor(random() * starts.length)] ?? 0;
  const startRow = rowOf(start);
  const startCol = colOf(start);
  for (let step = 0; step < 3; step += 1) {
    const index = (startRow + direction.row * step) * BOARD_SIZE
      + startCol + direction.col * step;
    if (board[index] && !board[index].fusion) board[index].color = color;
  }
}

export function makeBoard(
  level = 1,
  random: RandomSource = Math.random,
  tileId: TileIdSource = defaultTileId,
): Tile[] {
  const board: Tile[] = Array.from({ length: BOARD_CELLS }, (_, id) => ({
    id,
    color: randomColor(random),
  }));
  installGuaranteedLine(board, level <= 2 ? 'solar' : randomColor(random), random);
  if (level >= 8 && random() < 0.1) {
    board[17] = { id: tileId(), color: 'cosmic', fusion: true };
  }
  return board;
}

export function collapseBoard(
  board: Board,
  level = 1,
  spawnVortex = false,
  random: RandomSource = Math.random,
  tileId: TileIdSource = defaultTileId,
): { board: Tile[]; refilled: number[] } {
  const next: Board = Array(BOARD_CELLS).fill(null);
  const refilled: number[] = [];
  for (let col = 0; col < BOARD_SIZE; col += 1) {
    const survivors: Tile[] = [];
    for (let row = BOARD_SIZE - 1; row >= 0; row -= 1) {
      const tile = board[row * BOARD_SIZE + col];
      if (tile) survivors.push(tile);
    }
    for (let row = BOARD_SIZE - 1, i = 0; row >= 0; row -= 1, i += 1) {
      if (survivors[i]) next[row * BOARD_SIZE + col] = survivors[i];
      else {
        next[row * BOARD_SIZE + col] = { id: tileId(), color: randomColor(random) };
        refilled.push(row * BOARD_SIZE + col);
      }
    }
  }
  if (spawnVortex && level >= 5 && random() < 0.72 && refilled.length > 0) {
    const slot = refilled[Math.floor(random() * refilled.length)];
    next[slot] = { id: tileId(), color: 'cosmic', fusion: true };
  }
  if (!hasPlayableChain(next)) {
    installGuaranteedLine(next as Tile[], level <= 2 ? 'solar' : randomColor(random), random);
  }
  return { board: next as Tile[], refilled };
}

export function shuffleBoard(
  board: Tile[],
  level: number,
  random: RandomSource = Math.random,
  tileId: TileIdSource = defaultTileId,
): Tile[] {
  const shuffled = [...board];
  for (let cursor = shuffled.length - 1; cursor > 0; cursor -= 1) {
    const swap = Math.floor(random() * (cursor + 1));
    [shuffled[cursor], shuffled[swap]] = [shuffled[swap], shuffled[cursor]];
  }
  return hasPlayableChain(shuffled)
    ? shuffled
    : makeBoard(level, random, tileId);
}