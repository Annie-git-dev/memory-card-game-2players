import { useState } from 'react';
import { useGameStore } from '../store/gameStore'
import RollToStartModal from './RollToStartModal';
import { useCoinStore } from '../store/coinStore';

export default function StartScreen() {
    const difficulty = useGameStore((state) => state.difficulty);
    const player1 = useGameStore((state) => state.player1);
    const player2 = useGameStore((state) => state.player2);
    const setPlayer1 = useGameStore((state) => state.setPlayer1);
    const setPlayer2 = useGameStore((state) => state.setPlayer2);
    const setDifficulty = useGameStore((state) => state.setDifficulty);
    const [isVisible, setIsVisible] = useState(false);
    const setFlipResult = useCoinStore((state) => state.setFlipResult);

    const [errors, setErrors] = useState({ error: '' });

    const handleStart = () => {
        const name1 = player1.name.trim();
        const name2 = player2.name.trim();
        const newErrors = { error: '' };

        if (name1.length < 3 || name2.length < 3) {
            newErrors.error = 'Player name must be at most 10 characters';
        }

        if (name1.length > 10 || name2.length > 10) {
            newErrors.error = 'Player name must be at most 10 characters';
        }

        if (newErrors.error) {
            setErrors(newErrors);
            return;
        }

        setErrors({ error: '' });
        setPlayer1({ name: name1 });
        setPlayer2({ name: name2 });

        setIsVisible(true);
        setFlipResult(false);
    }

    return (
        <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-md text-center space-y-6 border border-white/20">
            <h1 className="text-3xl font-bold text-white">🎮 Start Game</h1>

            {errors.error && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fef3f3] text-[#d27c7c] text-sm px-3 py-1 rounded-md shadow-lg z-20 whitespace-nowrap">
                    {errors.error}
                </div>
            )}
            <div className="space-y-4 relative">
                <input
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={player1.name}
                    onChange={(e) => setPlayer1({ name: e.target.value })}
                    placeholder="Enter Player 1 name"
                />
                <input
                    className="w-full px-4 py-2 bg-gray-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={player2.name}
                    onChange={(e) => setPlayer2({ name: e.target.value })}
                    placeholder="Enter Player 2 name"
                />

                <div className="text-left">
                    <label className="block text-sm font-medium text-white mb-1">Set difficulty</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-200 rounded-lg border focus:outline-none"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="easy">Easy (4x4)</option>
                        <option value="medium">Medium (6x6)</option>
                        <option value="hard">Hard (8x8)</option>
                    </select>
                </div>
                <RollToStartModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
                <button
                    className="w-full px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-lg shadow hover:opacity-90 transition"
                    onClick={handleStart}
                >
                    Play
                </button>
            </div>
        </div>
    )
}
