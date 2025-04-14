import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCardStore = create(
    persist(
        (set) => ({
            cards: [],
            setCards: (cards) => set(() => ({ cards })),
            flippedCards: [],
            setFlippedCards: (flippedCards) => set(() => ({ flippedCards })),
            matchedCards: [],
            setMatchedCards: (matchedCards) => set(() => ({ matchedCards })),
        }),
        {
            name: 'card-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)