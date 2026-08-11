import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { GrowthStage } from '../types';

interface UpgradeModalProps {
  show: boolean;
  onClose: () => void;
  stage: GrowthStage;
}

const STAGE_LABELS: Record<GrowthStage, string> = {
  seedling: '幼苗',
  mature: '成株',
  blooming: '开花',
};

const STAGE_EMOJIS: Record<GrowthStage, string> = {
  seedling: '🌱',
  mature: '🌿',
  blooming: '🌸',
};

export default function UpgradeModal({ show, onClose, stage }: UpgradeModalProps) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={onClose}>
      <div className="animate-bounce-in bg-white rounded-3xl p-6 mx-4 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-center gap-3">
          <div className="text-6xl animate-float">{STAGE_EMOJIS[stage]}</div>
          <div className="flex items-center gap-1">
            <Sparkles size={18} className="text-gold" />
            <h3 className="text-lg font-bold text-gray-800">植物升级！</h3>
            <Sparkles size={18} className="text-gold" />
          </div>
          <p className="text-sm text-gray-500 text-center">
            恭喜！你的绿植已经成长为
            <span className="font-bold text-leaf-600">「{STAGE_LABELS[stage]}」</span>阶段
          </p>
          {stage === 'blooming' && (
            <p className="text-xs text-pink-500">🌺 你的细心呵护让它绽放了美丽的花朵！</p>
          )}
        </div>
      </div>
    </div>
  );
}
