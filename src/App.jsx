import { Route, Routes } from 'react-router'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StartScreen from './components/StartScreen'
import GameBoard from './pages/GameBoard'

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/stardust.png')] bg-cover bg-center">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/gameboard" element={<GameBoard />} />
        </Routes>
      </QueryClientProvider>
    </div>
  )
}

export default App
