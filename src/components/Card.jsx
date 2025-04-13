import { useCardStore } from '../store/cardStore';
import { useGameStore } from '../store/gameStore';

const Card = ({ img }) => {
    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);
    const flippedCards = useCardStore((state) => state.flippedCards);
    const setFlippedCards = useCardStore((state) => state.setFlippedCards);
    const matchedCards = useCardStore((state) => state.matchedCards);
    const setMatchedCards = useCardStore((state) => state.setMatchedCards);

    const gameStarted = useGameStore((state) => state.gameStarted);
    const startGame = useGameStore((state) => state.startGame);
    const currentPlayer = useGameStore((state) => state.currentPlayer);
    const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
    const incrementAttempts = useGameStore((state) => state.incrementAttempts);
    const incrementScore = useGameStore((state) => state.incrementScore);
    const startTimer = useGameStore((state) => state.startTimer);
    const stopTimer = useGameStore((state) => state.stopTimer);
    const setGameOver = useGameStore((state) => state.setGameOver);
    const isFirstPlayer = currentPlayer === 1;

    const handleCardClick = (id) => {
        if (!gameStarted) {
            startGame();
            startTimer(currentPlayer);
        }

        if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return;

        const updatedCards = [...cards];
        updatedCards[id].flipped = true;
        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            incrementAttempts(currentPlayer);

            const first = updatedCards[newFlipped[0]];
            const second = updatedCards[newFlipped[1]];

            if (first.url === second.url) {
                updatedCards[first.id].matched = true;
                updatedCards[second.id].matched = true;

                const newMatches = [...matchedCards, first.url];
                setMatchedCards(newMatches);
                setFlippedCards([]);
                incrementScore(currentPlayer);

                if (newMatches.length === (updatedCards.length / 2)) {
                    stopTimer();
                    setGameOver(true);
                }
            } else {
                setTimeout(() => {
                    updatedCards[first.id].flipped = false;
                    updatedCards[second.id].flipped = false;

                    const nextPlayer = isFirstPlayer ? 2 : 1;
                    setCurrentPlayer(nextPlayer);
                    startTimer(nextPlayer);
                    setFlippedCards([]);
                    setCards([...updatedCards]);
                }, 1000);
            }
        }

        setCards(updatedCards);
    }

    return (
        <div
            className="relative p-2 rounded-lg shadow-lg transition-transform duration-300 transform w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
            onClick={() => handleCardClick(img.id)}
        >
            <div className={`absolute inset-0 w-full h-full transition-transform transform
                ${img.flipped ? "[transform:rotateY(180deg)]" : ""}
                ${img.matched ? "animate-shake opacity-60 grayscale scale-95" : ""}`}>
                {!img.flipped ? <div className="card-front bg-gray-200 flex items-center justify-center rounded-lg h-full cursor-pointer">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black">🌓</span>
                </div> :
                    <div className="card-back absolute inset-0 bg-white flex items-center justify-center rounded-lg">
                        <img
                            src={img.url}
                            alt="Card Image"
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </div>}
            </div>
        </div>
    );
};

export default Card;
