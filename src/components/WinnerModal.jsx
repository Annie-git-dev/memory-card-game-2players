import { useNavigate } from "react-router";
import { useGameStore } from "../store/gameStore";

const WinnerModal = () => {
    const gameOver = useGameStore((state) => state.gameOver);
    const resetGame = useGameStore((state) => state.resetGame);
    const player1 = useGameStore((state) => state.player1);
    const player2 = useGameStore((state) => state.player2);

    const navigate = useNavigate();

    const handleResetGame = () => {
        resetGame();
        navigate("/");
    }

    return (
        <>
            {gameOver && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white text-center rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-2xl font-bold text-[#073763] mb-4">🎉 Game Over!</h2>
                        {(player1.score === player2.score && player1.score !== 0) && (
                            <p className="text-gray-700 text-lg mb-4">It's a tie!</p>
                        )}
                        {player1.score > player2.score && (
                            <p className="text-gray-700 text-lg mb-4">Winner: {player1.name}</p>
                        )}
                        {player1.score < player2.score && (
                            <p className="text-gray-700 text-lg mb-4">Winner: {player2.name}</p>
                        )}
                        <button
                            onClick={handleResetGame}
                            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-lg shadow hover:opacity-90 transition"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default WinnerModal