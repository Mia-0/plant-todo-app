import { Coins } from 'lucide-react';

interface DailyGoldBarProps {
  earned: number;
  cap: number;
}

export default function DailyGoldBar({ earned, cap }: DailyGoldBarProps) {
  const percentage = Math.min(100, (earned / cap) * 100);
  const isFull = earned >= cap;

  return (
    <div className="bg-white rounded-xl p-3 border border-leaf-100">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Coins size={16} className="text-gold" />
          <span className="text-xs text-gray-500">今日Todo金币</span>
        </div>
        <span className={`text-xs font-bold ${isFull ? 'text-amber-600' : 'text-gray-600'}`}>
          {earned}/{cap}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isFull ? 'bg-amber-400' : 'bg-leaf-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isFull && (
        <p className="text-xs text-amber-600 mt-1 text-center">
          🎉 今日金币已达上限，明天继续吧！
        </p>
      )}
    </div>
  );
}
