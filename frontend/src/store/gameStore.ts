import { create } from 'zustand';

interface GameState {
  gameId: string | null;
  setGameId: (id: string | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameId: null,
  setGameId: (id) => set({ gameId: id }),
}));
