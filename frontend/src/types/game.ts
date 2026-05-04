// src/types/game.ts
export interface Game {
  id: string;
  players: string[];
  status: string;
}

export interface GameResult {
  player: string;
  score: number;
}
