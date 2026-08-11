import type { Seed } from '../types';
import { ShoppingCart, Check } from 'lucide-react';

interface SeedCardProps {
  seed: Seed;
  owned: boolean;
  canAfford: boolean;
  onBuy: (seed: Seed) => void;
  onPlant: (seed: Seed) => void;
}

export default function SeedCard({ seed, owned, canAfford, onBuy, onPlant }: SeedCardProps) {
  return (
    <div
      className="rounded-2xl p-3.5 flex flex-col items-center gap-2 border border-leaf-100 bg-white transition-all hover:shadow-md"
    >
      {/* Emoji */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
        style={{ backgroundColor: seed.color + '40' }}
      >
        {seed.emoji}
      </div>

      {/* Info */}
      <h4 className="text-sm font-semibold text-gray-800">{seed.name}</h4>
      <p className="text-xs text-gray-400 text-center leading-tight">{seed.description}</p>

      {/* Price / Action */}
      {owned ? (
        <button
          onClick={() => onPlant(seed)}
          className="w-full mt-1 py-2 rounded-xl bg-leaf-500 text-white text-xs font-medium flex items-center justify-center gap-1 active:scale-95 transition-all"
        >
          <Check size={14} />
          种植
        </button>
      ) : (
        <div className="w-full mt-1">
          <div className="flex items-center justify-center gap-1 mb-1.5">
            <span className="text-sm font-bold text-amber-600">{seed.price}</span>
            <span className="text-xs text-amber-500">💰</span>
          </div>
          <button
            onClick={() => onBuy(seed)}
            disabled={!canAfford}
            className={`w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 active:scale-95 transition-all ${
              canAfford
                ? 'bg-amber-400 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <ShoppingCart size={14} />
            {canAfford ? '购买' : '金币不足'}
          </button>
        </div>
      )}
    </div>
  );
}
