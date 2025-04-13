import { create } from "zustand";

export const useCardStore = create((set) => ({
    cards: [],
    setCards: (cards) => set(() => ({ cards })),
    flippedCards: [],
    setFlippedCards: (flippedCards) => set(() => ({ flippedCards })),
    matchedCards: [],
    setMatchedCards: (matchedCards) => set(() => ({ matchedCards })),
}))