import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useCardStore } from './cardStore'

export const useGameStore = create(
  persist(
    (set, get) => ({
      player1: {
        name: 'Player 1',
        score: 0,
        attempts: 0,
        startTime: 0,
        elapsedTime: 0,
        isRunning: false,
      },
      player2: {
        name: 'Player 2',
        score: 0,
        attempts: 0,
        startTime: 0,
        elapsedTime: 0,
        isRunning: false,
      },
      animationFrameId: null,
      currentPlayer: null,
      difficulty: 'easy',
      gameStarted: false,
      duration: 0,
      gameOver: false,
      updatePlayer: (playerIndex, player) => set((state) => {
        const playerKey = playerIndex === 1 ? 'player1' : 'player2';
        return {
          [playerKey]: {
            ...state[playerKey],
            ...player,
            name: player.name?.trimStart() ?? state[playerKey].name
          }
        };
      }),
      setPlayer1: (player) => get().updatePlayer(1, player),
      setPlayer2: (player) => get().updatePlayer(2, player),
      setDifficulty: (dif) => set({ difficulty: dif }),
      setCurrentPlayer: (index) => set({ currentPlayer: index }),
      startGame: () => set({ gameStarted: true }),
      resetGame: () => {
        set({
          player1: { name: 'Player 1', score: 0, attempts: 0, startTime: 0, elapsedTime: 0, isRunning: false },
          player2: { name: 'Player 2', score: 0, attempts: 0, startTime: 0, elapsedTime: 0, isRunning: false },
          currentPlayer: null,
          duration: 0,
          difficulty: 'easy',
          gameStarted: false,
          animationFrameId: null,
        }),
          useCardStore.getState().resetCardState()
      },
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
        const { animationFrameId } = get();
        const playerKey = playerIndex === 1 ? 'player1' : 'player2';

        if (!get()[playerKey].isRunning) {
          set((state) => ({
            [playerKey]: {
              ...state[playerKey],
              isRunning: true,
              startTime: state[playerKey].startTime === 0 ? Date.now() : state[playerKey].startTime,
            },
          }));

          const tick = () => {
            set((state) => {
              const currentPlayerIndex = get().currentPlayer;
              const currentPlayerKey = currentPlayerIndex === 1 ? 'player1' : 'player2';

              if (state[currentPlayerKey]?.isRunning) {
                const currentTime = Date.now();
                const elapsedTime = currentTime - state[currentPlayerKey].startTime;
                return {
                  [currentPlayerKey]: { ...state[currentPlayerKey], elapsedTime: Math.floor(elapsedTime / 1000) }
                };
              }
              return {};
            });
            get().animationFrameId = requestAnimationFrame(tick);
          };

          get().animationFrameId = requestAnimationFrame(tick);
        }
      },
      stopTimer: (playerIndex) => {
        const playerKey = playerIndex === 1 ? 'player1' : 'player2';
        set((state) => ({
          [playerKey]: { ...state[playerKey], isRunning: false },
        }));
      },
      setGameOver: (value) => set({ gameOver: value })
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentPlayer: state.currentPlayer,
        player1: {
          name: state.player1.name,
          score: state.player1.score,
          attempts: state.player1.attempts,
          startTime: state.player1.startTime,
          elapsedTime: state.player1.elapsedTime,
        },
        player2: {
          name: state.player2.name,
          score: state.player2.score,
          attempts: state.player2.attempts,
          startTime: state.player2.startTime,
          elapsedTime: state.player2.elapsedTime,
        },
        gameStarted: state.gameStarted,
        difficulty: state.difficulty
      }),
    },
  ),
)