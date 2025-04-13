import { useGameStore } from '../store/gameStore';
import { useNavigate } from 'react-router';

const ResetButton = () => {
    const resetGame = useGameStore((state) => state.resetGame);
    const navigate = useNavigate();

    const handleResetGame = () => {
        if (window.confirm("Are you sure you want to reset the game? If you have already started the game, all progress will be lost.")) {
            resetGame();
            navigate("/");
        }
    }

    return (
        <button
            className="mb-4 px-6 py-2 bg-gray-200 text-[#073763] font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300"
            onClick={handleResetGame}
        >
            Reset Game
        </button>
    )
}

export default ResetButton