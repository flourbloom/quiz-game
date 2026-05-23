// src/api/game.ts
import api from './http';

export const startGame = (roomId: string) =>
  api.post(`/api/game/start`, { roomId });

export const submitAnswer = (gameId: string, answer: string) =>
  api.post(`/api/game/${gameId}/answer`, { answer });
