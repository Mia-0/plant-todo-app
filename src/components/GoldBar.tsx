import { Coins } from 'lucide-react';

interface GoldBarProps {
  gold: number;
  streak: number;
}

export default function GoldBar({ gold, streak }: GoldBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-leaf-100">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-gold-light rounded-full px-3 py-1">
          <Coins size={18} className="text-gold" />
          <span className="font-bold text-sm text-amber-800">{gold}</span>
        </div>
      </div>
      {streak > 0 && (
        <div className="flex items-center gap-1 text-xs text-leaf-700">
          <span>🔥</span>
          <span className="font-medium">连续养护 {streak} 天</span>
        </div>
      )}
    </div>
  );
}
