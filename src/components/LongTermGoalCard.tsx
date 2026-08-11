import type { LongTermGoal } from '../types';
import { Target, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';

interface LongTermGoalCardProps {
  goal: LongTermGoal;
  onClick: (goal: LongTermGoal) => void;
  onComplete: (id: string) => void;
}

const TYPE_ICONS = {
  fitness: { Icon: Target, color: 'text-orange-500', bg: 'bg-orange-50' },
  reading: { Icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
  skill: { Icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-50' },
};

export default function LongTermGoalCard({ goal, onClick, onComplete }: LongTermGoalCardProps) {
  const { Icon, color, bg } = TYPE_ICONS[goal.type];

  return (
    <div
      className={`rounded-xl border transition-all ${
        goal.completed
          ? 'bg-gray-50 border-gray-200 opacity-70'
          : 'bg-white border-leaf-100 hover:border-leaf-300 cursor-pointer'
      }`}
    >
      <div className="p-3" onClick={() => !goal.completed && onClick(goal)}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
            <Icon size={20} className={color} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold truncate ${goal.completed ? 'text-gray-400' : 'text-gray-800'}`}>
              {goal.title}
            </h4>
            <p className="text-xs text-gray-400 truncate">
              {goal.completed
                ? `✅ 已完成 · +${goal.goldReward}💰`
                : goal.progressNote || goal.description}
            </p>
          </div>
          {!goal.completed && (
            <>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(goal.id);
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-leaf-500 text-white font-medium active:scale-95 transition-all flex-shrink-0"
              >
                完成
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
