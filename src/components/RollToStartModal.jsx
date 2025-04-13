import { useGameStore } from "../store/gameStore";
import { useCoinStore } from "../store/coinStore";
import { useNavigate } from "react-router";

const RollToStartModal = ({ isVisible, onClose }) => {
    const player1 = useGameStore((state) => state.player1);
    const player2 = useGameStore((state) => state.player2);
    const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
    const setGameOver = useGameStore((state) => state.setGameOver);

    const isFlipping = useCoinStore((state) => state.isFlipping);
    const flipResult = useCoinStore((state) => state.flipResult);
    const setIsFlipping = useCoinStore((state) => state.setIsFlipping);
    const setFlipResult = useCoinStore((state) => state.setFlipResult);

    const navigate = useNavigate()

    const onRoll = () => {
        if (isFlipping) return;

        setIsFlipping(true);
        setFlipResult(null);

        setTimeout(() => {
            const coinNumber = Math.floor(Math.random() * 2) + 1;
            setFlipResult(coinNumber);
            setCurrentPlayer(coinNumber);
            setIsFlipping(false);
            setGameOver(false);

            setTimeout(() => {
                onClose();
                navigate('/gameboard')
            }, 1000);
        }, 1500);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-[#d0e0e3] p-6 rounded-xl shadow-2xl w-80 relative text-center">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors text-xl font-bold"
                    onClick={onClose}
                    disabled={isFlipping}
                >
                    ×
                </button>

                <h2 className="text-xl font-semibold mb-6">Roll to Start</h2>

                <button
                    className={`w-24 h-24 rounded-full relative mx-auto perspective-1000 transition-transform duration-300 
                        ${isFlipping ? 'animate-[spin_1.5s_ease-in-out]' : ''} 
                        ${flipResult === 2 ? 'rotate-y-180' : ''}`}
                    onClick={onRoll}
                    disabled={isFlipping}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: flipResult === 2 ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    <div className={`
                        absolute inset-0 rounded-full flex items-center justify-center
                        bg-gradient-to-br from-[#073763] to-yellow-600
                        text-white font-bold text-sm backface-hidden
                        ${flipResult === 2 ? 'hidden' : ''}
                    `} style={{
                            backfaceVisibility: 'hidden',
                        }}>
                        {player1.name}
                    </div>

                    <div className={`
                        absolute inset-0 rounded-full flex items-center justify-center
                        bg-gradient-to-br from-red-400 to-[#073763]
                        text-white font-bold text-sm backface-hidden
                        ${flipResult === 1 ? 'hidden' : ''}
                    `} style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}>
                        {player2.name}
                    </div>
                </button>

                {flipResult && (
                    <div className="mt-6 text-lg font-semibold text-gray-700">
                        {flipResult === 1 ? player1.name : player2.name} starts the game
                    </div>
                )}
            </div>
        </div>
    );
};

export default RollToStartModal;