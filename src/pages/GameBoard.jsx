import { useQuery } from '@tanstack/react-query';
import { fetchImages } from '../api/fetchImages';
import { useGameStore } from '../store/gameStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCardStore } from '../store/cardStore';
import Card from '../components/Card';
import formatDuration from '../utils/timeFormatter'
import ResetButton from '../components/resetButton';
import WinnerModal from '../components/WinnerModal';

const GameBoard = () => {
    const player1 = useGameStore((state) => state.player1);
    const player2 = useGameStore((state) => state.player2);
    const currentPlayer = useGameStore((state) => state.currentPlayer);
    const resetGame = useGameStore((state) => state.resetGame);
    const difficulty = useGameStore((state) => state.difficulty);
    const countMap = { easy: 8, medium: 18, hard: 32 };
    const count = countMap[difficulty] ?? 8;
    const navigate = useNavigate();

    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);
    const gridCols = difficulty === 'easy' ? 'grid-cols-4' :
        difficulty === 'medium' ? 'grid-cols-6' :
            'grid-cols-8';
    const isFirstPlayer = currentPlayer === 1;
    
    const { data } = useQuery({
        queryKey: ['images', count],
        queryFn: fetchImages,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled: !!(count && !cards.length),
    });

    useEffect(() => {
        if (data) {
            const imageUrls = data.map(img => img.download_url)
            setTimeout(() => {
                const selectedContent = shuffle([...imageUrls]).slice(0, count);
                const duplicated = shuffle([...selectedContent, ...selectedContent]);

                const board = duplicated.map((content, index) => ({
                    id: index,
                    url: content,
                    flipped: false,
                    matched: false
                }));

                setCards(board);
            }, 50)
        }
    }, [data, count, setCards])

    useEffect(() => {
        if (!currentPlayer) {
            const timeout = setTimeout(() => {
                navigate("/");
                resetGame();
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, []);

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    if (!currentPlayer) return (
        <div className="bg-white p-6 rounded-xl shadow-2xl">
            <p className="text-xl font-semibold text-gray-800 animate-pulse">
                Please select a player first...
            </p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to start screen</p>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="flex p-4 space-x-8">
                <div className="flex flex-col items-center w-40">
                    <div
                        className={`text-white 
                            ${isFirstPlayer ? "animate-pulse bg-gradient-to-br from-[#073763] to-yellow-600" : ""
                            } py-2 px-4 rounded-lg text-lg font-semibold shadow-md transition duration-300`}
                    >
                        {player1.name}
                    </div>
                    <p className="text-white mt-2 text-sm min-h-[4.5rem] text-center leading-relaxed">
                        Attempts: {player1.attempts} <br />
                        Score: {player1.score} <br />
                        Time: {formatDuration(player1.elapsedTime)}
                    </p>
                </div>

                <div className="flex flex-col items-center w-40">
                    <div
                        className={`text-white 
                            ${!isFirstPlayer ? "animate-pulse bg-gradient-to-br from-red-400 to-[#073763]" : ""
                            } py-2 px-4 rounded-lg text-lg font-semibold shadow-md transition duration-300`}
                    >
                        {player2.name}
                    </div>
                    <p className="text-white mt-2 text-sm min-h-[4.5rem] text-center leading-relaxed">
                        Attempts: {player2.attempts} <br />
                        Score: {player2.score} <br />
                        Time: {formatDuration(player2.elapsedTime)}
                    </p>
                </div>
            </div>

            <ResetButton />
            <WinnerModal />

            <div className={`grid gap-4 game-container justify-items-center p-4 rounded-lg 
                    ${isFirstPlayer ? "bg-gradient-to-br from-[#073763] to-yellow-600" : "bg-gradient-to-br from-red-400 to-[#073763]"} 
                    ${gridCols}`}>
                {cards?.map((card) => (
                    <Card
                        key={card.id}
                        img={card}
                    />
                ))}
            </div>
        </div>
    )
}

export default GameBoard