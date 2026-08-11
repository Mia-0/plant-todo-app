import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { getToday } from '../utils/storage';
import { canEarnTodoGold, createLongTermGoal } from '../utils/gameLogic';
import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';
import DailyGoldBar from '../components/DailyGoldBar';
import LongTermGoalCard from '../components/LongTermGoalCard';
import GoalDetail from '../components/GoalDetail';
import { Plus, Target, BookOpen, Lightbulb } from 'lucide-react';
import type { LongTermGoal, GoalType, BodyMeasurements, FitnessTarget } from '../types';

export default function TodoPage() {
  const {
    data, todayGold, addTodo, toggleTodo, deleteTodo,
    addLongTermGoal, completeLongTermGoal,
    updateGoalProgress,
  } = useGame();

  const [selectedGoal, setSelectedGoal] = useState<LongTermGoal | null>(null);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoalType, setNewGoalType] = useState<GoalType | null>(null);

  const today = getToday();
  const todayTodos = data.todos.filter(t => t.date === today);
  const incompleteTodos = todayTodos.filter(t => !t.completed);
  const completedTodos = todayTodos.filter(t => t.completed);
  const atCap = !canEarnTodoGold(data);

  const handleAddTodo = (title: string) => {
    addTodo(title);
  };

  const handleCreateGoal = (type: GoalType) => {
    setNewGoalType(type);
  };

  const handleConfirmGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('goalTitle') as HTMLInputElement).value.trim();
    const desc = (form.elements.namedItem('goalDesc') as HTMLInputElement).value.trim();
    if (!title) return;

    const goal = createLongTermGoal(newGoalType!, title, desc, {
      ...(newGoalType === 'fitness' && { measurements: undefined, targets: [] }),
      ...(newGoalType === 'reading' && { bookTitle: '', bookAuthor: '' }),
      ...(newGoalType === 'skill' && { skillName: title }),
    });
    addLongTermGoal(goal);
    setNewGoalType(null);
  };

  const handleAddExerciseTodo = (exerciseName: string, goalId: string) => {
    addTodo(exerciseName, 'fitness', goalId);
    setSelectedGoal(null);
  };

  const handleUpdateFitness = (goalId: string, _measurements: BodyMeasurements, targets: FitnessTarget[]) => {
    const goal = data.longTermGoals.find(g => g.id === goalId);
    if (!goal) return;
    // Update the goal with measurements and targets
    updateGoalProgress(goalId, `目标：${targets.filter(t => t.part).map(t => `${t.part}减${t.target - t.current}cm`).join('、')}`);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">📋 今日打卡</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(today).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Gold Bar */}
      <div className="px-4 mb-3">
        <DailyGoldBar earned={todayGold} cap={data.user.dailyGoldCap} />
      </div>

      {/* Todo List */}
      <div className="px-4 space-y-2 mb-4">
        {/* Incomplete todos */}
        {incompleteTodos.map(todo => (
          <TodoItem
            key={todo.id}
            item={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            disabled={atCap}
          />
        ))}

        {/* Completed todos */}
        {completedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            item={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>

      {/* Add Todo */}
      <div className="px-4 mb-4">
        <AddTodoForm onAdd={handleAddTodo} />
        {atCap && (
          <p className="text-xs text-amber-600 mt-1.5 text-center">
            ⚠️ 今日打卡金币已达上限，明天继续吧
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="px-4 mb-3">
        <div className="border-t border-leaf-100" />
      </div>

      {/* Long Term Goals */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-700">🎯 长期目标</h3>
          <button
            onClick={() => setShowNewGoal(!showNewGoal)}
            className="flex items-center gap-1 text-xs text-leaf-600 font-medium"
          >
            <Plus size={14} />
            新建
          </button>
        </div>

        {/* New Goal Type Selector */}
        {showNewGoal && !newGoalType && (
          <div className="space-y-2 mb-3 animate-fade-in-up">
            {[
              { type: 'fitness' as GoalType, label: '身材管理', desc: '记录围度目标，获取运动推荐', Icon: Target, color: 'text-orange-500', bg: 'bg-orange-50' },
              { type: 'reading' as GoalType, label: '阅读完一本书', desc: '精选书单推荐，记录阅读进度', Icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
              { type: 'skill' as GoalType, label: '学会一项技能', desc: '自定义技能目标，拆解每日任务', Icon: Lightbulb, color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map(({ type, label, desc, Icon, color, bg }) => (
              <button
                key={type}
                onClick={() => handleCreateGoal(type)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-leaf-100 hover:border-leaf-300 active:scale-[0.98] transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={20} className={color} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-800">{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* New Goal Form */}
        {newGoalType && (
          <form onSubmit={handleConfirmGoal} className="mb-3 p-3 rounded-xl bg-white border border-leaf-200 animate-fade-in-up space-y-2">
            <input
              name="goalTitle"
              placeholder={newGoalType === 'reading' ? '目标标题，如：读完《三体》' : newGoalType === 'fitness' ? '目标标题，如：夏季塑形计划' : '目标标题，如：学会弹吉他'}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
              required
            />
            <input
              name="goalDesc"
              placeholder="简单描述一下你的目标..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-leaf-400"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setNewGoalType(null)}
                className="flex-1 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium"
              >
                返回
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 rounded-lg bg-leaf-500 text-white text-xs font-medium"
              >
                创建目标
              </button>
            </div>
          </form>
        )}

        {/* Goal List */}
        <div className="space-y-2">
          {/* Active goals */}
          {data.longTermGoals.filter(g => !g.completed).map(goal => (
            <LongTermGoalCard
              key={goal.id}
              goal={goal}
              onClick={setSelectedGoal}
              onComplete={completeLongTermGoal}
            />
          ))}

          {/* Completed goals */}
          {data.longTermGoals.filter(g => g.completed).map(goal => (
            <LongTermGoalCard
              key={goal.id}
              goal={goal}
              onClick={() => {}}
              onComplete={completeLongTermGoal}
            />
          ))}
        </div>

        {data.longTermGoals.length === 0 && !showNewGoal && (
          <p className="text-xs text-gray-400 text-center py-4">
            还没有长期目标，点击「新建」开始吧
          </p>
        )}
      </div>

      {/* Goal Detail Modal */}
      {selectedGoal && (
        <GoalDetail
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onUpdateProgress={updateGoalProgress}
          onAddExerciseTodo={handleAddExerciseTodo}
          onUpdateFitness={handleUpdateFitness}
        />
      )}
    </div>
  );
}
