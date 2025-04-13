import { create } from 'zustand'

export const useCoinStore = create((set) => ({
    isFlipping: false,
    flipResult: null,
    setIsFlipping: (flipping) => set({ isFlipping: flipping }),
    setFlipResult: (result) => set({ flipResult: result })
}))
