import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="添加今日待办事项..."
        className="flex-1 px-4 py-2.5 rounded-xl border border-leaf-200 bg-white text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-leaf-400 focus:ring-2 focus:ring-leaf-100 transition-all"
      />
      <button
        onClick={handleSubmit}
        disabled={!input.trim()}
        className="px-4 py-2.5 rounded-xl bg-leaf-500 text-white font-medium text-sm flex items-center gap-1 disabled:opacity-40 active:scale-95 transition-all"
      >
        <Plus size={16} />
        <span>添加</span>
      </button>
    </div>
  );
}
