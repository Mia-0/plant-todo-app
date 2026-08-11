import { useEffect } from 'react';
import { Trophy, X } from 'lucide-react';
import { STREAK_BONUS_GOLD } from '../utils/gameLogic';

interface AchievementModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AchievementModal({ show, onClose }: AchievementModalProps) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 4000);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
      <div className="animate-bounce-in bg-white rounded-3xl p-6 mx-4 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400">
          <X size={20} />
        </button>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center">
            <Trophy size={32} className="text-gold" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">🏆 绿手指成就！</h3>
          <p className="text-sm text-gray-500 text-center">
            连续 3 天按时养护绿植，你的用心获得了回报！
          </p>
          <div className="bg-gold-light rounded-2xl px-4 py-2 mt-1">
            <span className="text-amber-800 font-bold text-lg">
              +{STREAK_BONUS_GOLD}💰 额外红包
            </span>
          </div>
          <p className="text-xs text-gray-400">继续坚持，绿植会越来越美 🌿</p>
        </div>
      </div>
    </div>
  );
}
