import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { SEEDS } from '../data/seeds';
import SeedCard from '../components/SeedCard';
import type { Seed } from '../types';
import { Coins, Sprout } from 'lucide-react';

export default function ShopPage() {
  const { data, buySeed, createPlantFromSeed } = useGame();
  const [message, setMessage] = useState<string | null>(null);

  const handleBuy = (seed: Seed) => {
    const success = buySeed(seed.id, seed.price);
    if (success) {
      setMessage(`🎉 成功购买「${seed.name}」种子！`);
      setTimeout(() => setMessage(null), 2500);
    }
  };

  const handlePlant = (seed: Seed) => {
    createPlantFromSeed(seed.id);
    setMessage(`🌱 已种下「${seed.name}」，快去主页看看吧！`);
    setTimeout(() => setMessage(null), 2500);
  };

  // Filter out the initial pothos since user already has it
  const shopSeeds = SEEDS.filter(s => s.id !== 'pothos');

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">🛒 种子商城</h2>
            <p className="text-xs text-gray-400 mt-0.5">用金币解锁新品种绿植</p>
          </div>
          <div className="flex items-center gap-1.5 bg-gold-light rounded-full px-3 py-1.5">
            <Coins size={16} className="text-gold" />
            <span className="font-bold text-sm text-amber-800">{data.user.gold}</span>
          </div>
        </div>
      </div>

      {/* Toast message */}
      {message && (
        <div className="mx-4 mb-3 p-3 rounded-xl bg-leaf-100 text-sm text-leaf-700 font-medium text-center animate-fade-in-up">
          {message}
        </div>
      )}

      {/* Intro */}
      <div className="px-4 mb-4">
        <div className="p-3 rounded-xl bg-leaf-50 border border-leaf-100 flex items-center gap-3">
          <Sprout size={20} className="text-leaf-600" />
          <div>
            <p className="text-xs text-leaf-700 font-medium">💡 温馨提示</p>
            <p className="text-xs text-leaf-600">
              购买种子后点击「种植」即可在主页开始养护新植物，已养护的植物进度会保留哦
            </p>
          </div>
        </div>
      </div>

      {/* Seed Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {shopSeeds.map(seed => {
            const owned = data.user.ownedSeeds.includes(seed.id) ||
              data.user.plants.some(p => p.type === seed.id);
            return (
              <SeedCard
                key={seed.id}
                seed={seed}
                owned={owned}
                canAfford={data.user.gold >= seed.price}
                onBuy={handleBuy}
                onPlant={handlePlant}
              />
            );
          })}
        </div>
      </div>

      {/* My Seeds */}
      {(data.user.ownedSeeds.length > 0 || data.user.plants.length > 1) && (
        <div className="px-4 mt-6 mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-2">🌱 我的植物/种子</h3>
          <div className="space-y-1.5">
            {data.user.plants.map(plant => (
              <div key={plant.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-leaf-50">
                <span className="text-2xl">{SEEDS.find(s => s.id === plant.type)?.emoji || '🌿'}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {SEEDS.find(s => s.id === plant.type)?.name || plant.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {plant.stage === 'seedling' ? '幼苗' : plant.stage === 'mature' ? '成株' : '开花'} · 养护 {plant.totalCareCount} 次
                  </div>
                </div>
                {plant.id === data.user.activePlantId && (
                  <span className="ml-auto text-xs bg-leaf-200 px-2 py-0.5 rounded-full text-leaf-700">当前</span>
                )}
              </div>
            ))}
            {data.user.ownedSeeds.filter(
              s => !data.user.plants.some(p => p.type === s)
            ).map(seedType => {
              const seed = SEEDS.find(s => s.id === seedType);
              if (!seed) return null;
              return (
                <div key={seedType} className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50">
                  <span className="text-xl">{seed.emoji}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{seed.name}种子</div>
                    <div className="text-xs text-gray-400">未种植</div>
                  </div>
                  <button
                    onClick={() => handlePlant(seed)}
                    className="ml-auto text-xs px-2.5 py-1 rounded-lg bg-leaf-500 text-white font-medium active:scale-95"
                  >
                    种植
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-4 pb-4">
        <p className="text-xs text-gray-300 text-center">
          🛒 更多种子品种即将上架，敬请期待
        </p>
      </div>
    </div>
  );
}
