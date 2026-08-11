import { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import ShopPage from './pages/ShopPage';
import BottomNav from './components/BottomNav';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA] max-w-lg mx-auto relative">
      {/* Page content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'todo' && <TodoPage />}
        {activeTab === 'shop' && <ShopPage />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
