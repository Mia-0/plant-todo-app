import { Check, Trash2 } from 'lucide-react';
import type { TodoItem as TodoItemType } from '../types';

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export default function TodoItem({ item, onToggle, onDelete, disabled }: TodoItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        item.completed
          ? 'bg-gray-50 opacity-60'
          : 'bg-white border border-gray-100'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all active:scale-90 ${
          item.completed
            ? 'bg-leaf-500 border-leaf-500'
            : disabled
            ? 'border-gray-200 bg-gray-100'
            : 'border-gray-300 hover:border-leaf-400'
        }`}
        disabled={disabled && !item.completed}
      >
        {item.completed && <Check size={14} className="text-white" />}
      </button>

      {/* Title */}
      <span className={`flex-1 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {item.title}
      </span>

      {/* Gold reward */}
      <span className="text-xs text-amber-600 font-medium flex-shrink-0">
        +{item.goldReward}💰
      </span>

      {/* Delete */}
      <button
        onClick={() => onDelete(item.id)}
        className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
