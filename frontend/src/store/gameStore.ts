import { create } from 'zustand';
import type { Quiz } from '../types/quiz';

interface GameState {
  gameId: string | null;
  setGameId: (id: string | null) => void;
  quiz: Quiz | null;
  setQuiz: (quiz: Quiz | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameId: null,
  setGameId: (id) => set({ gameId: id }),
  quiz: null,
  setQuiz: (quiz) => set({ quiz }),
}));
