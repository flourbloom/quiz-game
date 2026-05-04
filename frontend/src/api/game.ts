// src/api/game.ts
import axios from 'axios';

export const startGame = (roomId: string) =>
  axios.post(`/api/game/start`, { roomId });

export const submitAnswer = (gameId: string, answer: string) =>
  axios.post(`/api/game/${gameId}/answer`, { answer });
