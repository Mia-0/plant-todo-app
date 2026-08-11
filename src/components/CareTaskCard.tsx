import type { CareIssue } from '../types';
import { getCareTaskInfo } from '../utils/gameLogic';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface CareTaskCardProps {
  issue: CareIssue;
  onComplete: (issue: CareIssue) => void;
}

export default function CareTaskCard({ issue, onComplete }: CareTaskCardProps) {
  const task = getCareTaskInfo(issue);
  const [animating, setAnimating] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!task || completed) return null;

  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      setCompleted(true);
      onComplete(issue);
    }, 400);
  };

  return (
    <button
      onClick={handleClick}
      disabled={animating}
      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all active:scale-95 ${
        animating
          ? 'bg-leaf-100 scale-95 opacity-0'
          : 'bg-white border-2 border-dashed border-amber-300 hover:border-amber-400 hover:shadow-sm'
      }`}
    >
      <span className="text-2xl">{task.icon}</span>
      <div className="flex-1 text-left">
        <div className="font-medium text-sm text-gray-800">{task.actionLabel}</div>
        <div className="text-xs text-gray-400">点击完成养护</div>
      </div>
      <div className="flex items-center gap-1 bg-gold-light rounded-full px-2.5 py-1">
        <span className="text-xs font-bold text-amber-700">+{task.goldReward}💰</span>
      </div>
      {animating && (
        <div className="absolute right-4">
          <Check size={20} className="text-leaf-600 animate-bounce-in" />
        </div>
      )}
    </button>
  );
}
