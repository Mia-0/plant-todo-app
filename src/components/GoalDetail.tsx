import { useState } from 'react';
import type { LongTermGoal } from '../types';
import { X, Plus } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import FitnessForm from './FitnessForm';
import BookPicker from './BookPicker';

interface GoalDetailProps {
  goal: LongTermGoal;
  onClose: () => void;
  onUpdateProgress: (id: string, note: string) => void;
  onAddExerciseTodo: (exerciseName: string, goalId: string) => void;
  onUpdateFitness?: (goalId: string, measurements: any, targets: any[]) => void;
}

export default function GoalDetail({ goal, onClose, onUpdateProgress, onAddExerciseTodo, onUpdateFitness }: GoalDetailProps) {
  const [note, setNote] = useState(goal.progressNote || '');
  const [showFitness, setShowFitness] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const handleSaveNote = () => {
    onUpdateProgress(goal.id, note);
  };

  const relevantExercises = goal.type === 'fitness'
    ? EXERCISES
    : [];

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center modal-overlay" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{goal.title}</h3>
          <button onClick={onClose} className="text-gray-400 p-1">
            <X size={22} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Description */}
          <p className="text-sm text-gray-500">{goal.description}</p>

          {/* Progress note */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">进度记录</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              onBlur={handleSaveNote}
              placeholder="记录你的进展...（如：已读100页、腰围已减2cm）"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-leaf-400 resize-none"
              rows={3}
            />
          </div>

          {/* Fitness: measurements & exercises */}
          {goal.type === 'fitness' && (
            <>
              <div>
                <button
                  onClick={() => setShowFitness(!showFitness)}
                  className="text-sm font-medium text-leaf-600"
                >
                  {showFitness ? '收起' : '📏 录入/更新身体数据'}
                </button>
                {showFitness && (
                  <div className="mt-2">
                    <FitnessForm
                      goal={goal}
                      onSave={(measurements, targets) => {
                        onUpdateFitness?.(goal.id, measurements, targets);
                        setShowFitness(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">🏃 推荐运动方案</h4>
                <div className="space-y-2">
                  {relevantExercises.map(ex => (
                    <div key={ex.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-leaf-50">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{ex.name}</div>
                        <div className="text-xs text-gray-400">
                          {ex.targetPart} · {ex.duration} · {ex.difficulty === 'easy' ? '简单' : ex.difficulty === 'medium' ? '中等' : '较难'}
                        </div>
                      </div>
                      <button
                        onClick={() => onAddExerciseTodo(ex.name, goal.id)}
                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-leaf-500 text-white font-medium active:scale-95"
                      >
                        <Plus size={14} />
                        加入打卡
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Reading: book picker */}
          {goal.type === 'reading' && (
            <div>
              <button
                onClick={() => setShowBook(!showBook)}
                className="text-sm font-medium text-leaf-600"
              >
                {showBook ? '收起' : '📚 选择要读的书'}
              </button>
              {showBook && (
                <div className="mt-2">
                  <BookPicker
                    onSelect={(book) => {
                      onUpdateProgress(goal.id, `正在读：《${book.title}》`);
                      setNote(`正在读：《${book.title}》`);
                      setShowBook(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Skill: freeform */}
          {goal.type === 'skill' && (
            <div className="p-3 rounded-xl bg-purple-50">
              <p className="text-xs text-purple-600">
                💡 提示：把技能拆解为每天的小任务，添加到 Todo 打卡中完成。
              </p>
            </div>
          )}
        </div>

        <div className="p-4 pt-0 safe-bottom">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium">
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
