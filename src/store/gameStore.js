import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useGameStore = create(
  persist(
    (set, get) => ({
      player1: {
        name: 'Player 1',
        score: 0,
        attempts: 0,
        time: 0
      },
      player2: {
        name: 'Player 2',
        score: 0,
        attempts: 0,
        time: 0
      },
      timerInterval: null,
      currentPlayer: null,
      difficulty: 'easy',
      gameStarted: false,
      duration: 0,
      gameOver: false,
      setPlayer1: (player) => set((state) => ({
        player1: {
          ...state.player1,
          ...player,
          name: player.name?.trimStart() ?? state.player1.name
        }
      })),
      setPlayer2: (player) => set((state) => ({
        player2: {
          ...state.player2,
          ...player,
          name: player.name?.trimStart() ?? state.player1.name
        }
      })),
      setDifficulty: (dif) => set({ difficulty: dif }),
      setCurrentPlayer: (index) => set({ currentPlayer: index }),
      startGame: () => set({ gameStarted: true }),
      resetGame: () => set({
        player1: { name: 'Player 1', score: 0, attempts: 0, time: 0 },
        player2: { name: 'Player 2', score: 0, attempts: 0, time: 0 },
        currentPlayer: null,
        duration: 0,
        gameStarted: false,
        timerInterval: null
      }),
      incrementScore: (playerIndex) => set((state) => {
        const playerKey = playerIndex === 1 ? 'player1' : 'player2';
        const updatedPlayer = { ...state[playerKey], score: state[playerKey].score + 1 };
        return { [playerKey]: updatedPlayer };
      }),
      incrementAttempts: (playerIndex) => set((state) => {
        const playerKey = playerIndex === 1 ? 'player1' : 'player2';
        const updatedPlayer = { ...state[playerKey], attempts: state[playerKey].attempts + 1 };
        return { [playerKey]: updatedPlayer };
      }),
      startTimer: (playerIndex) => {
        const { stopTimer } = get();
        stopTimer();

        const interval = setInterval(() => {
          set((state) => {
            const key = playerIndex === 1 ? 'player1' : 'player2';
            return {
              [key]: { ...state[key], time: state[key].time + 1 }
            };
          });
        }, 1000);

        set({ timerInterval: interval });
      },

      stopTimer: () => {
        const { timerInterval } = get();
        if (timerInterval) {
          clearInterval(timerInterval);
          set({ timerInterval: null });
        }
      },
      setGameOver: (value) => set({ gameOver: value })
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
